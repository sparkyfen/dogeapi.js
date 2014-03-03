var DogeAPI = require('../../src/index.js');
describe('Doge API', function () {
    var instance;
    beforeEach(function () {
        instance = new DogeAPI();
    });
	it('verifies the API object', function () {
		expect(instance).not.toBe(null);
	});
	it('gets the balance of an account', function () {
        instance.getBalance(function (error, balance) {
			expect(balance).not.toBe(null);
		});
	});
	it('returns all payment addresses/address_ids for your account', function () {
        instance.getAddresses(function (error, addresses) {
			expect(addresses).not.toBe(null);
		});
	});
	it('returns the current amount received to all addresses with an address label', function () {
        instance.getAddressReceived(null, 'main', function (error, amount) {
			expect(amount).not.toBe(null);
		});
	});
	it('returns an address from a address label', function () {
        instance.getAddressByLabel('main', function (error, address) {
			expect(address).not.toBe(null);
		});
	});
	it('returns the current difficulty of the network', function () {
        instance.getDifficulty(function (error, difficulty) {
			expect(difficulty).not.toBe(null);
		});
	});
	it('returns the current block on the network', function () {
        instance.getCurrentBlock(function (error, currentBlock) {
			expect(currentBlock).not.toBe(null);
		});
	});
	it('returns the current price of BTC to DOGE', function () {
        instance.getCurrentPrice('BTC', 1, function (error, currentPrice) {
			expect(currentPrice).not.toBe(null);
		});
        instance.getCurrentPrice(100, function (error, currentPrice) {
			expect(currentPrice).not.toBe(null);
		});
        instance.getCurrentPrice('BTC', function (error, currentPrice) {
			expect(currentPrice).not.toBe(null);
		});
	});
});