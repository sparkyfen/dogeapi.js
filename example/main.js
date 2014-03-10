var DogeAPI = require('../src/index.js');
var instance = new DogeAPI();

// Get balance
instance.getBalance(function (error, balance) {
	if(error) {
		// Handle error
	}
	console.log(balance);
});


instance.withdraw(amount, paymentAddress, pin, function (error, transactionid) {
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
	console.log(price);
});

instance.getCurrentPrice('BTC', function (error, price) {
	if(error) {
		// Handle error
	}
	console.log(price);
});

instance.getCurrentPrice(1000, function (error, price) {
	if(error) {
		// Handle error
	}
	console.log(price);
});

instance.createUser(userid, function (error, paymentAddress) {
	if(error) {
		// Handle error
	}
	console.log(paymentAddress);
});

instance.getUserAddress(userid, function (error, address) {
	if(error) {
		// Handle error
	}
	console.log(address);
});

instance.getUserBalance(userid, function (error, balance) {
	if(error) {
		// Handle error
	}
	console.log(balance);
});

instance.withdrawFromUser(userid, paymentAddress, amount, pin, function (error, transactionid) {
	if(error) {
		// Handle error
	}
	console.log(transactionid);
});

instance.moveToUser(toUserId, fromUserId, amount, function (error, transactionid) {
	if(error) {
		// Handle error
	}
	console.log(transactionid);
});

instance.getUsers(function (error, users) {
	if(error) {
		// Handle error
	}
	console.log(users);
});

instance.getTransactions(number, type, function (error, transactions) {
	if(error) {
		// Handle error
	}
	console.log(transactions);
});

instance.getTransactions(number, type, {type: 'label', value: 'myLabel'}, function (error, transactions) {
	if(error) {
		// Handle error
	}
	console.log(transactions);
});

instance.getTransactions(number, type, {type: 'paymentaddress', value: 'DKobMeoZqAkmdQpZ7e24zoPtd8zLbPT6xx'}, function (error, transactions) {
	if(error) {
		// Handle error
	}
	console.log(transactions);
});

instance.getTransactions(number, type, {type: 'userid', value: 'myUserId'}, function (error, transactions) {
	if(error) {
		// Handle error
	}
	console.log(transactions);
});

instance.getNetworkHashRate(function (error, hashRate) {
	if(error) {
		// Handle error
	}
	console.log(hashRate);
});

instance.getInfo(function (error, info) {
	if(error) {
		// Handle error
	}
	console.log(info);
});