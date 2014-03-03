var DogeAPI = require('../../src/index.js');
instance = new DogeAPI();

// Get balance
instance.getBalance(function (error, balance) {
	if(error) {
		// Handle error
	}
	console.log(balance);
});

instance.withdraw(amount, paymentAddress, function (error, transactionid) {
	if(error) {
		// Handle error
	}
	console.log(transactionid);
});

// Get a new address created
instance.getNewAddress(addressLabel, function (error, address) {
	if(error) {
		// Handle error
	}
	console.log(address);
});

// Get addresses
instance.getAddresses(function (error, addresses) {
	if(error) {
		// Handle error
	}
	console.log(addresses);
});

// Get address received
instance.getAddressReceived(null, 'main', function (error, amount) {
	if(error) {
		// Handle error
	}
	console.log(amount);
});

instance.getAddressByLabel(addressLabel, function (error, address) {
	if(error) {
		// Handle error
	}
	console.log(address);
});

instance.getDifficulty(function (error, difficulty) {
	if(error) {
		// Handle error
	}
	console.log(difficulty);
});

instance.getCurrentBlock(function (error, currentBlock) {
	if(error) {
		// Handle error
	}
	console.log(currentBlock);
});
instance.getCurrentPrice('BTC', 1000, function (error, price) {
	if(error) {
		// Handle error
	}
});