var dogeAPI = require('../../src/index.js');
describe('Doge API', function () {
	it('verifies the API object', function () {
		expect(dogeAPI).not.toBe(null);
	});
	it('gets the balance of an account', function () {
		dogeAPI.getBalance(function (error, balance) {
			expect(balance).not.toBe(null);
		});
	});
	it('returns all payment addresses/address_ids for your account', function () {
		dogeAPI.getAddresses(function (error, addresses) {
			expect(addresses).not.toBe(null);
		});
	});
	it('returns the current amount received to all addresses with an address label', function () {
		dogeAPI.getAddressReceived(null, 'main', function (error, amount) {
			expect(amount).not.toBe(null);
		});
	});
	it('returns an address from a address label', function () {
		dogeAPI.getAddressByLabel('main', function (error, address) {
			expect(address).not.toBe(null);
		});
	});
	it('returns the current difficulty of the network', function () {
		dogeAPI.getDifficulty(function (error, difficulty) {
			expect(difficulty).not.toBe(null);
		});
	});
	it('returns the current block on the network', function () {
		dogeAPI.getCurrentBlock(function (error, currentBlock) {
			expect(currentBlock).not.toBe(null);
		});
	});
	it('returns the current price of BTC to DOGE', function () {
		dogeAPI.getCurrentPrice('BTC', 1, function (error, currentPrice) {
			expect(currentPrice).not.toBe(null);
		});
		dogeAPI.getCurrentPrice(100, function (error, currentPrice) {
			expect(currentPrice).not.toBe(null);
		});
		dogeAPI.getCurrentPrice('BTC', function (error, currentPrice) {
			expect(currentPrice).not.toBe(null);
		});
	});
});