var dogeAPI = require('../../src/index.js');

// Get balance
dogeAPI.getBalance(function (error, balance) {
	if(error) {
		// Handle error
	}
	console.log(balance);
});

dogeAPI.withdraw(amount, paymentAddress, pin, function (error, transactionid) {
	if(error) {
		// Handle error
	}
	console.log(transactionid);
});

// Get a new address created
dogeAPI.getNewAddress(addressLabel, function (error, address) {
	if(error) {
		// Handle error
	}
	console.log(address);
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

dogeAPI.getCurrentPrice('BTC', 1000, function (error, price) {
	if(error) {
		// Handle error
	}
});

dogeAPI.createUser(userid, function (error, paymentAddress) {
	if(error) {
		// Handle error
	}
});

dogeAPI.getUserAddress(userid, function (error, address) {
	if(error) {
		// Handle error
	}
});

dogeAPI.getUserBalance(userid, function (error, address) {
	if(error) {
		// Handle error
	}
});

dogeAPI.withdrawFromUser(userid, paymentAddress, amount, pin, function (error, transactionid) {
	if(error) {
		// Handle error
	}
});

// TODO, we don't know what type of response this is as of right now.
dogeAPI.moveToUser(toUserId, fromUserId, amount, function (error, response) {
	if(error) {
		// Handle error
	}
});

dogeAPI.getUsers(function (error, users) {
	if(error) {
		// Handle error
	}
});

dogeAPI.getTransactions(number, type, function (error, transactions) {
	if(error) {
		// Handle error
	}
});

dogeAPI.getNetworkHashRate(function (error, hashRate) {
	if(error) {
		// Handle error
	}
});

dogeAPI.getInfo(function (error, info) {
	if(error) {
		// Handle error
	}
});