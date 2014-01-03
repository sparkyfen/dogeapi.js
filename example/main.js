var dogeAPI = require('../../index.js');

// Get balance
dogeAPI.getBalance(function (error, balance) {
	if(error) {
		// Handle error
	}
	console.log(balance);
});

dogeAPI.withdraw(amount, paymentAddress, function (error, transactionid) {
	if(error) {
		// Handle error
	}
	console.log(transactionid);
});

// Get a new address created
dogeAPI.getNewAddress(addressLabel, function (error, amount) {
	if(error) {
		// Handle error
	}
	console.log(amount);
});

// Get addresses
dogeAPI.getAddresses(function (error, addresses) {
	if(error) {
		// Handle error
	}
	console.log(addresses);
});

// Get address received
dogeAPI.getAddressReceived(null, 'main', function (error, amount) {
	if(error) {
		// Handle error
	}
	console.log(amount);
});

dogeAPI.getAddressByLabel(addressLabel, function (error, address) {
	if(error) {
		// Handle error
	}
	console.log(address);
});

dogeAPI.getDifficulty(function (error, difficulty) {
	if(error) {
		// Handle error
	}
	console.log(difficulty);
});

dogeAPI.getCurrentBlock(function (error, currentBlock) {
	if(error) {
		// Handle error
	}
	console.log(currentBlock);
});