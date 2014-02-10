/**
 * @apiDefinePermission public This information is publicly accessible.
 * No authentication is required.
 *
 * @apiVersion 1.0.0
 */

/**
 * @apiDefinePermission user Authenticated access is required.
 * An API key is required.
 *
 * @apiVersion 1.0.0
 */
var settings = require('./settings.js');
var APIKEY = settings.apikey;
var request = require('request');
var validator = require('validator');
var ENDPOINT = settings.endpoint;

/**
 * @api {get} /wow/?api_key={API_KEY}&a=get_balance Get Balance
 * @apiVersion 1.0.0
 * @apiName GetBalance
 * @apiGroup DogeCoin
 * @apiPermission user
 *
 * @apiDescription Returns the DOGE balance of your entire account to 8 decimal places.
 *
 * @apiParam {String} apikey The user's api key
 * @apiParam {String} a The action to perform
 *
 * @apiExample CURL example:
 *      curl -X GET 'https://dogeapi.com/wow/?api_key={API_KEY}&a=get_balance'
 *
 * @apiSuccess {int} amount The amount in the entire account
 *
 * @apiSuccessExample Success-Response (example):
 *     HTTP/1.1 200 OK
 *     18.95245109
 *
 * @apiError (Success 200) InvalidAPIKey The user's API key is either missing or invalid.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 200 OK
 *     "Invalid API Key"
 *
 */
var getBalance = function (callback) {
	_checkAPIKey(function (error) {
		if(error) return callback(error);
		request(ENDPOINT + 'wow/?api_key=' + APIKEY + '&a=get_balance', function (error, response, body) {
			if(error) return callback(error);
			if(response.statusCode === 200) {
				return callback(null, body);
			} else {
				return callback(body);
			}
		});
	});
};

/**
 * @api {get} /wow/?api_key={API_KEY}&a=withdraw&amount={AMOUNT}&payment_address={PAYMENT_ADDRESS} Withdraw
 * @apiVersion 1.0.0
 * @apiName Withdraw
 * @apiGroup DogeCoin
 * @apiPermission user
 *
 * @apiDescription Withdraws AMOUNT doge to a {PAYMENT_ADDRESS} you specify.
 *
 * @apiParam {String} apikey The user's api key
 * @apiParam {String} a The action to perform
 * @apiParam {int} amount The amount to withdraw
 * @apiParam {String} payment_address The account to withdraw to
 *
 * @apiExample CURL example:
 *      curl -X GET 'https://dogeapi.com/wow/?api_key={API_KEY}&a=withdraw&amount={AMOUNT}&payment_address={PAYMENT_ADDRESS}'
 *
 * @apiSuccess {int} transaction The unique transaction id on the market
 *
 * @apiSuccessExample Success-Response (example):
 *     HTTP/1.1 200 OK
 *     "52c5a2923b113ef07c47b077ba8bf3a03381c687f218f6b326773892565d6963"
 *
 * @apiError (Success 200) InvalidAPIKey The user's API key is either missing or invalid.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 200 OK
 *     "Invalid API Key"
 *
 * @apiError (Success 200) NotEnoughDoge The user does not have enough Doge in their account.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 200 OK
 *     "Not enough Doge"
 *
 * @apiError (Success 200) BadQuery The query was invalid, probably indicated a missing parameter
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 200 OK
 *     "Bad Query"
 *
 */
var withdraw = function (amount, paymentAddress, callback) {
	_checkAPIKey(function (error) {
		if(error) return callback(error);
		if(!amount) return callback('Missing amount to withdraw.');
		if(!paymentAddress) return callback('Missing payment address to send to.');
		// TODO there may be an issue withdrawing amounts lower than 10 doge.
		request(ENDPOINT + 'wow/?api_key=' + APIKEY + '&a=withdraw&amount=' + amount + '&payment_address=' + paymentAddress, function (error, response, body) {
			if(error) return callback(error);
			if(response.statusCode === 200) {
				return callback(null, body);
			} else {
				return callback(body);
			}
		});
	});
};

/**
 * @api {get} /wow/?api_key={API_KEY}&a=get_new_address&address_label={ADDRESS_LABEL} Get New Address
 * @apiVersion 1.0.0
 * @apiName GetNewAddress
 * @apiGroup DogeCoin
 * @apiPermission user
 *
 * @apiDescription Returns a new payment address for your account. You can pass an optional alphanumeric {ADDRESS_LABEL} as a label for the address.
 *
 * @apiParam {String} apikey The user's api key
 * @apiParam {String} a The action to perform
 * @apiParam {String} address_label The optional, alphanumerical address label for the wallet
 *
 * @apiExample CURL example:
 *      curl -X GET 'https://dogeapi.com/wow/?api_key={API_KEY}&a=get_new_address&address_label={ADDRESS_LABEL}'
 *
 * @apiSuccess {String} address The address created
 *
 * @apiSuccessExample Success-Response (example):
 *     HTTP/1.1 200 OK
 *     "DQrzy6eccdPZ4n3Hi6oD6XZ4ndBFRX"
 *
 * @apiError (Success 200) InvalidAPIKey The user's API key is either missing or invalid.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 200 OK
 *     "Invalid API Key"
 *
 */
var getNewAddress = function (addressLabel, callback) {
	_checkAPIKey(function (error) {
		if(error) return callback(error);
		var apiQuery = 'wow/?api_key=' + APIKEY + '&a=get_new_address'
		if(addressLabel) {
			if(validator.isAlphanumeric(addressLabel)) {
				apiQuery += '&address_label=' + addressLabel;
			} else {
				return callback('Invalid address label.');
			}
		}
		request(ENDPOINT + apiQuery, function (error, response, body) {
			if(error) return callback(error);
			if(response.statusCode === 200) {
				return callback(null, body);
			} else {
				return callback(body);
			}
		});
	});
};

/**
 * @api {get} /wow/?api_key={API_KEY}&a=get_my_addresses Get My Addresses
 * @apiVersion 1.0.0
 * @apiName GetMyAddresses
 * @apiGroup DogeCoin
 * @apiPermission user
 *
 * @apiDescription Returns all payment addresses/address_ids for your account.
 *
 * @apiParam {String} apikey The user's api key
 * @apiParam {String} a The action to perform
 *
 * @apiExample CURL example:
 *      curl -X GET 'https://dogeapi.com/wow/?api_key={API_KEY}&a=get_my_addresses'
 *
 * @apiSuccess {Array} addresses The list of addresses on your account.
 *
 * @apiSuccessExample Success-Response (example):
 *     HTTP/1.1 200 OK
 *     ["DQ6eccdPZ4n3Hi6orzyD6XZ6XF24ndBFRX", "DQrzy5eci6oZ4n9HD6XFRX4dnBZ4ncdPdB"]
 *
 * @apiError (Success 200) InvalidAPIKey The user's API key is either missing or invalid.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 200 OK
 *     "Invalid API Key"
 *
 */
var getAddresses = function (callback) {
	_checkAPIKey(function (error) {
		if(error) return callback(error);
		request(ENDPOINT + 'wow/?api_key=' + APIKEY + '&a=get_my_addresses', function (error, response, body) {
			if(error) return callback(error);
			if(response.statusCode === 200) {
				return callback(null, body);
			} else {
				return callback(body);
			}
		});
	});
};

/**
 * @api {get} /wow/?api_key={API_KEY}&a=get_address_received&payment_address={PAYMENT_ADDRESS} Get Address Received
 * @apiVersion 1.0.0
 * @apiName GetAddressReceived
 * @apiGroup DogeCoin
 * @apiPermission user
 *
 * @apiDescription Returns the current amount received to all addresses with {ADDRESS_LABEL} or {PAYMENT_ADDRESS}.
 * 
 * @apiParam {String} apikey The user's api key
 * @apiParam {String} a The action to perform
 * @apiParam {String} payment_address The payment address to check the amount with
 * @apiParam {String} address_label The address label to check the amount with
 *
 * @apiExample CURL example:
 *      curl -X GET 'https://dogeapi.com/wow/?api_key={API_KEY}&a=get_address_received&payment_address={PAYMENT_ADDRESS}'
 *      
 * @apiExample CURL example:
 *      curl -X GET 'https://dogeapi.com/wow/?api_key={API_KEY}&a=get_address_received&address_label={ADDRESS_LABEL}'
 *      
 * @apiSuccess {Array} addresses The list of addresses on your account.
 *
 * @apiSuccessExample Success-Response (example):
 *     HTTP/1.1 200 OK
 *     ["DQ6eccdPZ4n3Hi6orzyD6XZ6XF24ndBFRX", "DQrzy5eci6oZ4n9HD6XFRX4dnBZ4ncdPdB"]
 *
 * @apiError (Success 200) InvalidAPIKey The user's API key is either missing or invalid.
 * 
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 200 OK
 *     "Invalid API Key"
 *     
 */
var getAddressReceived = function (paymentAddress, addressLabel, callback) {
	_checkAPIKey(function (error) {
		if(error) return callback(error);
		if(!paymentAddress) return callback('Missing payment address or address label.');
		// Verify we have a read address
		_verifyAddress(paymentAddress, function (error) {
			if(error) return callback(error);
			// If we did not get an address label, then we only have payment address and callback
			addressLabel = typeof(addressLabel) === 'undefined' ? null : addressLabel;
			if(!addressLabel) {
				apiQuery = 'wow/?api_key=' + APIKEY + '&a=get_address_received&payment_address=' + paymentAddress;
			} else {
				apiQuery = 'wow/?api_key=' + APIKEY + '&a=get_address_received&address_label=' + addressLabel
			}
			request(ENDPOINT + apiQuery, function (error, response, body) {
				if(error) return callback(error);
				if(response.statusCode === 200) {
					return callback(null, body);
				} else {
					return callback(body);
				}
			});
		});
	});
};

/**
 * @api {get} /wow/?api_key={API_KEY}&a=get_address_by_label&address_label={ADDRESS_LABEL} Get Address By Label
 * @apiVersion 1.0.0
 * @apiName GetAddressByLabel
 * @apiGroup DogeCoin
 * @apiPermission user
 *
 * @apiDescription Returns the payment address for the given {ADDRESS_LABEL}
 * 
 * @apiParam {String} apikey The user's api key
 * @apiParam {String} a The action to perform
 * @apiParam {String} address_label The address label to check the amount with
 * 
 * @apiExample CURL example:
 *      curl -X GET 'https://dogeapi.com/wow/?api_key={API_KEY}&a=get_address_by_label&address_label={ADDRESS_LABEL}'
 *
 * @apiSuccess {String} address The addresses on your account.
 *
 * @apiSuccessExample Success-Response (example):
 *     HTTP/1.1 200 OK
 *     "DQ6eccdPZ4n3Hi6orzyD6XZ6XF24ndBFRX"
 *
 * @apiError (Success 200) InvalidAPIKey The user's API key is either missing or invalid.
 * @apiError (Success 200) InvalidAddress The user's address key is invalid.
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 200 OK
 *     "Invalid API Key"
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 200 OK
 *     null
 */
var getAddressByLabel = function (addressLabel, callback) {
	_checkAPIKey(function (error) {
		if(error) return callback(error);
		if(!addressLabel) return callback('Missing address label.');
		request(ENDPOINT + 'wow/?api_key='+APIKEY+'&a=get_address_by_label&address_label='+addressLabel, function (error, response, body) {
			if(error) return callback(error);
			if(response.statusCode === 200) {
				return callback(null, body);
			} else {
				return callback(body);
			}
		});
	});
};

/**
 * @api {get} /wow/?a=get_difficulty Get Difficulty
 * @apiVersion 1.0.0
 * @apiName GetDifficulty
 * @apiGroup DogeCoin
 * @apiPermission public
 *
 * @apiDescription Returns the current difficulty. This doesn't require an API key.
 * 
 * @apiParam {String} a The action to perform
 * 
 * @apiExample CURL example:
 *      curl -X GET 'https://dogeapi.com/wow/?a=get_difficulty'
 *
 * @apiSuccess {int} difficulty The current difficulty
 *
 * @apiSuccessExample Success-Response (example):
 *     HTTP/1.1 200 OK
 *     321.8045805
 *
 */
var getDifficulty = function (callback) {
	request(ENDPOINT + 'wow/?a=get_difficulty', function (error, response, body) {
		if(error) return callback(error);
		if(response.statusCode === 200) {
			return callback(null, body);
		} else {
			return callback(body);
		}
	});
};

/**
 * @api {get} /wow/?a=get_current_block Get Current Block
 * @apiVersion 1.0.0
 * @apiName Get Current Block
 * @apiGroup DogeCoin
 * @apiPermission public
 *
 * @apiDescription Returns the current block. This doesn't require an API key.
 * 
 * @apiParam {String} a The action to perform
 * 
 * @apiExample CURL example:
 *      curl -X GET 'https://dogeapi.com/wow/?a=get_current_block'
 *
 * @apiSuccess {int} currentBlock The current block
 *
 * @apiSuccessExample Success-Response (example):
 *     HTTP/1.1 200 OK
 *     39405
 *
 */
var getCurrentBlock = function (callback) {
	request(ENDPOINT + 'wow/?a=get_current_block', function (error, response, body) {
		if(error) return callback(error);
		if(response.statusCode === 200) {
			return callback(null, body);
		} else {
			return callback(body);
		}
	});
};

/**
 * @api {get} /wow/?a=get_current_price Get Current Price
 * @apiVersion 1.0.0
 * @apiName Get Current Price
 * @apiGroup DogeCoin
 * @apiPermission public
 *
 * @apiDescription Returns the current price in USD or BTC. This doesn't require an API key.
 *
 * @apiParam {String} a The action to perform
 * @apiParam {String} convert_to To convert to USD or BTC (Defaults to USD)
 * @apiParam {int} amount_doge The amount of Doge to convert (Defaults to 1 Doge.)
 *
 * @apiExample CURL example:
 *      curl -X GET 'https://dogeapi.com/wow/?a=get_current_price&convert_to=BTC&amount_doge=1000'
 *
 * @apiSuccess {int} currentPrice The current price of BTC or USD for the Doge amount given.
 *
 * @apiSuccessExample Success-Response (example):
 *     HTTP/1.1 200 OK
 *     0.00206000
 *
 * @apiError (Success 200) InvalidConversion The conversion unit was not USD or BTC
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 200 OK
 *     "invalid conversion unit"
 *
 * @apiError (Success 200) InvalidAmount The amount was not a valid amount of Doge. (Probably not a number)
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 200 OK
 *     "Invalid Amount"
 *
 */
var getCurrentPrice = function (conversionType, amount, callback) {
	var apiQuery = 'wow/?a=get_current_price';
	var args = [];
	for(var argCounter = 0; argCounter < arguments.length; argCounter++) {
		args.push(arguments[argCounter]);
	}
	callback = args.pop();
	if(args.length > 0 && typeof(args[0]) === 'number') {
		amount = args.shift();
		apiQuery += '&amount=' + amount;
	}
	if(args.length > 0 && typeof(args[0]) === 'string') {
		conversionType = args.shift();
		apiQuery += '&convert_to=' + conversionType.toUpperCase();
	}
	if(args.length > 0) {
		amount = args.shift();
		apiQuery += '&amount=' + amount;
	}
	request(ENDPOINT + apiQuery, function (error, response, body) {
		if(error) return callback(error);
		if(response.statusCode === 200) {
			return callback(null, body);
		} else {
			return callback(body);
		}
	});
};



//Verifies that the incoming address is legitimate
var _verifyAddress = function (dogeAddr, callback) {
	if(dogeAddr.length !== 34 || dogeAddr[0] !== 'D') {
		return callback('Invalid doge address.');
	}
	_dogeChainVerify(dogeAddr, function (error) {
		if(error && error.code === 'ETIMEOUT') {
			return callback(); // We could not query dogechain so we will allow DogeAPI to deal with more verification
		} else if(error) {
			return callback(error);
		}
		return callback();
	});
};

// Queries DogeChain to verify the legitimacy of an address
var _dogeChainVerify = function(dogeAddr, callback) {
	request('http://dogechain.info/chain/Dogecoin/q/checkaddress/'+dogeAddr, function (error, response, body) {
		if(error) return callback(error);
		if(response.statusCode === 200) {
			switch(body) {
				case 'X5':
				case 'SZ':
				case 'CK':
				return callback('Invalid doge address.');
				default:
				return callback();
			}
		}
	});
};

// Check to make sure we have an API key
var _checkAPIKey = function (callback) {
	if(APIKEY === undefined || APIKEY === '' || APIKEY === null) {
		return callback('Missing API key.');
	}
	return callback();
};

module.exports = {
	getBalance: getBalance,
	withdraw: withdraw,
	getNewAddress: getNewAddress,
	getAddresses: getAddresses,
	getAddressReceived: getAddressReceived,
	getAddressByLabel: getAddressByLabel,
	getDifficulty: getDifficulty,
	getCurrentBlock: getCurrentBlock,
	getCurrentPrice: getCurrentPrice
};