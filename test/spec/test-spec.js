var dogeAPI = require('../../index.js');
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
});