/**
 * @apiDefinePermission public This information is publicly accessible.
 * No authentication is required.
 *
 * @apiVersion 2.0.0
 */

/**
 * @apiDefinePermission user Authenticated access is required.
 * An API key is required.
 *
 * @apiVersion 2.0.0
 */

var defaultSettings = require('./settings.js');
var request = require('request');
var validator = require('validator');

function DogeAPI(settings) {
    settings = settings || {};
    this._endpoint = settings.endpoint || defaultSettings.endpoint;
    this._apikey = settings.apikey || defaultSettings.apikey;
}

/**
 * @api {get} /wow/v2/?api_key={API_KEY}&a=get_balance Get Balance
 * @apiVersion 2.0.0
 * @apiName GetBalance
 * @apiGroup DogeCoin
 * @apiPermission user
 *
 * @apiDescription Returns the DOGE balance of your entire account to 8 decimal places.
 *
 * @apiParam {String} api_key The user's api key
 * @apiParam {String} a The action to perform
 *
 * @apiExample CURL example:
 *      curl -X GET 'https://dogeapi.com/wow/v2/?api_key={API_KEY}&a=get_balance'
 *
 * @apiSuccess {String} balance The amount in the entire account.
 *
 * @apiSuccessExample Success-Response (example):
 *     HTTP/1.1 200 OK
 *     {"data":{"balance":"18.95245109"}}
 *
 * @apiError (Unauthorized 401) InvalidAPIKey The user's API key is either missing or invalid.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 401 Unauthorized
 *     {"error":"Invalid API Key"}
 *
 * @apiError (Bad Request 400) NotLive The v2 API is not available for the specified API key given.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {"error":"v2 is not yet live"}
 *
 */
DogeAPI.prototype.getBalance = function (callback) {
	var self = this;
  self._checkAPIKey(function (error) {
    if(error) return callback(error);
    request(self._endpoint + 'wow/v2/?api_key=' + self._apikey + '&a=get_balance', function (error, response, body) {
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
 * @api {get} /wow/v2?api_key={API_KEY}&a=withdraw&amount_doge={AMOUNT}&pin={PIN}&payment_address={PAYMENT_ADDRESS} Withdraw
 * @apiVersion 2.0.0
 * @apiName Withdraw
 * @apiGroup DogeCoin
 * @apiPermission user
 *
 * @apiDescription Withdraws {AMOUNT} doge to a {PAYMENT_ADDRESS} you specify. Requires your {PIN}. For now this must be more than 5 doge, and you must have enough extra in your wallet to pay all network fees (another 1-3 doge). DogeAPI takes a 0.5% fee when withdrawing.
 *
 * @apiParam {String} api_key The user's api key
 * @apiParam {String} a The action to perform
 * @apiParam {int} amount_doge The amount to withdraw
 * @apiParam {int} pin Your account pin number
 * @apiParam {String} payment_address The account to withdraw to
 *
 * @apiExample CURL example:
 *      curl -X GET 'https://dogeapi.com/wow/v2/?api_key={API_KEY}&a=withdraw&amount_doge={AMOUNT}&pin={PIN}&payment_address={PAYMENT_ADDRESS}'
 *
 * @apiSuccess {String} transaction The unique transaction id on the market
 *
 * @apiSuccessExample Success-Response (example):
 *     HTTP/1.1 200 OK
 *     {"data":{"txid": "52c5a2923b113ef07c47b077ba8bf3a03381c687f218f6b326773892565d6963"}}
 *
 * @apiError (Unauthorized 401) InvalidAPIKey The user's API key is either missing or invalid.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 401 Unauthorized
 *     {"error":"Invalid API Key"}
 *
 * @apiError (Unauthorized 401) UnauthorizedShibe The user's pin was invalid
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 401 Unauthorized
 *     {"error":"Unauthorized Shibe"}
 *
 * @apiError (Bad Request 400) NotEnoughDoge The user does not have enough Doge in their account.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {"error":"Not Enough Doge"}
 *
 * @apiError (Bad Request 400) AmountDogeRequired The amount of doge is missing from the request.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {"error":"amount_doge required"}
 *
 * @apiError (Bad Request 400) AtLeast5Doge The amount of doge withdrawing is lower than allowed amount.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {"error":"Must Withdraw At Least 5 Doge"}
 *
 *
 * @apiError (Bad Request 400) NotLive The v2 API is not available for the specified API key given.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {"error":"v2 is not yet live"}
 *
 */
DogeAPI.prototype.withdraw = function (amount, paymentAddress, pin, callback) {
	var self = this;
  self._checkAPIKey(function (error) {
    if(error) return callback(error);
    if(!amount) return callback('Missing amount to withdraw.');
    if(!paymentAddress) return callback('Missing payment address to send to.');
    if(!pin) return callback('Missing account PIN.');
    request(self._endpoint + 'wow/v2/?api_key=' + self._apikey + '&a=withdraw&amount_doge=' + amount + '&pin=' + pin + '&payment_address=' + paymentAddress, function (error, response, body) {
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
 * @api {get} /wow/v2/?api_key={API_KEY}&a=get_new_address&address_label={ADDRESS_LABEL} Get New Address
 * @apiVersion 2.0.0
 * @apiName GetNewAddress
 * @apiGroup DogeCoin
 * @apiPermission user
 *
 * @apiDescription Returns a new payment address for your account. You can pass an optional alphanumeric {ADDRESS_LABEL} as a label for the address.
 *
 * @apiParam {String} api_key The user's api key
 * @apiParam {String} a The action to perform
 * @apiParam {String} address_label The optional, alphanumerical address label for the wallet
 *
 * @apiExample CURL example:
 *      curl -X GET 'https://dogeapi.com/wow/v2/?api_key={API_KEY}&a=get_new_address&address_label={ADDRESS_LABEL}'
 *
 * @apiSuccess {String} address The address created
 *
 * @apiSuccessExample Success-Response (example):
 *     HTTP/1.1 200 OK
 *     {"data":{"address":"DQrzy6eccdPZ4n3Hi6oD6XZ4ndBFRX"}}
 *
 * @apiError (Unauthorized 401) InvalidAPIKey The user's API key is either missing or invalid.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 401 Unauthorized
 *     {"error":"Invalid API Key"}
 *
 * @apiError (Unauthorized 401) UnauthorizedShibe The reqesting IP is not allowed to make API calls.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 401 Unauthorized
 *     {"error":"Unauthorized Shibe"}
 *
 * @apiError (Bad Request 400) NotLive The v2 API is not available for the specified API key given.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {"error":"v2 is not yet live"}
 *
 */
DogeAPI.prototype.getNewAddress = function (addressLabel, callback) {
	var self = this;
  self._checkAPIKey(function (error) {
    if(error) return callback(error);
    var apiQuery = 'wow/v2/?api_key=' + self._apikey + '&a=get_new_address'
    if(addressLabel) {
      if(validator.isAlphanumeric(addressLabel)) {
        apiQuery += '&address_label=' + addressLabel;
      } else {
        return callback('Invalid address label.');
      }
    }
    request(self._endpoint + apiQuery, function (error, response, body) {
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
 * @api {get} /wow/v2/?api_key={API_KEY}&a=get_my_addresses Get My Addresses
 * @apiVersion 2.0.0
 * @apiName GetMyAddresses
 * @apiGroup DogeCoin
 * @apiPermission user
 *
 * @apiDescription Returns all payment addresses/address_ids for your account.
 *
 * @apiParam {String} api_key The user's api key
 * @apiParam {String} a The action to perform
 *
 * @apiExample CURL example:
 *      curl -X GET 'https://dogeapi.com/wow/?api_key={API_KEY}&a=get_my_addresses'
 *
 * @apiSuccess {Array} addresses The list of addresses on your account.
 *
 * @apiSuccessExample Success-Response (example):
 *     HTTP/1.1 200 OK
 *     {"data":{"addresses":["DQ6eccdPZ4n3Hi6orzyD6XZ6XF24ndBFRX", "DQrzy5eci6oZ4n9HD6XFRX4dnBZ4ncdPdB"]}}
 *
 * @apiError (Unauthorized 401) InvalidAPIKey The user's API key is either missing or invalid.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 401 Unauthorized
 *     {"error":"Invalid API Key"}
 *
 * @apiError (Unauthorized 401) UnauthorizedShibe The reqesting IP is not allowed to make API calls.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 401 Unauthorized
 *     {"error":"Unauthorized Shibe"}
 *
 * @apiError (Bad Request 400) NotLive The v2 API is not available for the specified API key given.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {"error":"v2 is not yet live"}
 *
 */
DogeAPI.prototype.getAddresses = function (callback) {
	var self = this;
  self._checkAPIKey(function (error) {
    if(error) return callback(error);
    request(self._endpoint + 'wow/v2/?api_key=' + self._apikey + '&a=get_my_addresses', function (error, response, body) {
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
 * @api {get} /wow/v2/?api_key={API_KEY}&a=get_address_received&payment_address={PAYMENT_ADDRESS} Get Address Received
 * @apiVersion 2.0.0
 * @apiName GetAddressReceived
 * @apiGroup DogeCoin
 * @apiPermission user
 *
 * @apiDescription Returns the current amount received to all addresses with {ADDRESS_LABEL} or {PAYMENT_ADDRESS}.
 *
 * @apiParam {String} api_key The user's api key
 * @apiParam {String} a The action to perform
 * @apiParam {String} payment_address The payment address to check the amount with
 * @apiParam {String} address_label The address label to check the amount with
 *
 * @apiExample CURL example:
 *      curl -X GET 'https://dogeapi.com/wow/v2/?api_key={API_KEY}&a=get_address_received&payment_address={PAYMENT_ADDRESS}'
 *
 * @apiExample CURL example:
 *      curl -X GET 'https://dogeapi.com/wow/v2/?api_key={API_KEY}&a=get_address_received&address_label={ADDRESS_LABEL}'
 *
 * @apiSuccess {Array} Received The amount of Doge received to the address(es) requested.
 *
 * @apiSuccessExample Success-Response (example):
 *     HTTP/1.1 200 OK
 *     {"data":{"received":18.95245109}}
 *
 * @apiError (Bad Request 400) AddressPaymentRequireed Missing either address_label or payment_address
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {"error":"address_label or payment_address Required"}
 *
 * @apiError (Unauthorized 401) InvalidAPIKey The user's API key is either missing or invalid.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 401 Unauthorized
 *     {"error":"Invalid API Key"}
 *
 * @apiError (Unauthorized 401) UnauthorizedShibe The reqesting IP is not allowed to make API calls.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 401 Unauthorized
 *     {"error":"Unauthorized Shibe"}
 *
 * @apiError (Bad Request 400) NotLive The v2 API is not available for the specified API key given.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {"error":"v2 is not yet live"}
 *
 */
DogeAPI.prototype.getAddressReceived = function (paymentAddress, addressLabel, callback) {
	var self = this;
  self._checkAPIKey(function (error) {
    if(error) return callback(error);
    if(!paymentAddress) return callback('Missing payment address or address label.');
    // Verify we have a real address
    self._verifyAddress(paymentAddress, function (error) {
      if(error) return callback(error);
      // TODO Maybe switch this to arguments check
      // If we did not get an address label, then we only have payment address and callback
      addressLabel = typeof(addressLabel) === 'undefined' ? null : addressLabel;
      if(!addressLabel) {
        apiQuery = 'wow/v2/?api_key=' + self._apikey + '&a=get_address_received&payment_address=' + paymentAddress;
      } else {
        apiQuery = 'wow/v2/?api_key=' + self._apikey + '&a=get_address_received&address_label=' + addressLabel
      }
      request(self._endpoint + apiQuery, function (error, response, body) {
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
 * @api {get} /wow/v2/?api_key={API_KEY}&a=get_address_by_label&address_label={ADDRESS_LABEL} Get Address By Label
 * @apiVersion 2.0.0
 * @apiName GetAddressByLabel
 * @apiGroup DogeCoin
 * @apiPermission user
 *
 * @apiDescription Returns the payment address for the given {ADDRESS_LABEL}
 *
 * @apiParam {String} api_key The user's api key
 * @apiParam {String} a The action to perform
 * @apiParam {String} address_label The address label to check the amount with
 *
 * @apiExample CURL example:
 *      curl -X GET 'https://dogeapi.com/wow/v2/?api_key={API_KEY}&a=get_address_by_label&address_label={ADDRESS_LABEL}'
 *
 * @apiSuccess {String} address The addresses on your account.
 *
 * @apiSuccessExample Success-Response (example):
 *     HTTP/1.1 200 OK
 *     {"data":{"addresses":["DQ6eccdPZ4n3Hi6orzyD6XZ6XF24ndBFRX"]}}
 *
 * @apiError (Unauthorized 401) InvalidAPIKey The user's API key is either missing or invalid.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 401 Unauthorized
 *     {"error":"Invalid API Key"}
 *
 * @apiError (Not Found 404) InvalidAddress The user's address key is invalid.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 404 Not Found
 *     {"error":"No Addresses Found"}
 *
 * @apiError (Unauthorized 401) UnauthorizedShibe The reqesting IP is not allowed to make API calls.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 401 Unauthorized
 *     {"error":"Unauthorized Shibe"}
 *
 * @apiError (Bad Request 400) NotLive The v2 API is not available for the specified API key given.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {"error":"v2 is not yet live"}
 *
 */
DogeAPI.prototype.getAddressByLabel = function (addressLabel, callback) {
	var self = this;
  self._checkAPIKey(function (error) {
    if(error) return callback(error);
    if(!addressLabel) return callback('Missing address label.');
    request(self._endpoint + 'wow/v2/?api_key=' + self._apikey + '&a=get_address_by_label&address_label=' + addressLabel, function (error, response, body) {
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
 * @api {get} /wow/v2/?a=get_difficulty Get Difficulty
 * @apiVersion 2.0.0
 * @apiName GetDifficulty
 * @apiGroup DogeCoin
 * @apiPermission public
 *
 * @apiDescription Returns the current difficulty. This doesn't require an API key.
 *
 * @apiParam {String} a The action to perform
 *
 * @apiExample CURL example:
 *      curl -X GET 'https://dogeapi.com/wow/v2/?a=get_difficulty'
 *
 * @apiSuccess {string} difficulty The current difficulty
 *
 * @apiSuccessExample Success-Response (example):
 *     HTTP/1.1 200 OK
 *     {"data":{"difficulty":"1190.35"}}
 *
 * @apiError (Bad Request 400) NotLive The v2 API is not available for the specified API key given.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {"error":"v2 is not yet live"}
 *
 */
DogeAPI.prototype.getDifficulty = function (callback) {
	var self = this;
  request(self._endpoint + 'wow/v2/?a=get_difficulty', function (error, response, body) {
    if(error) return callback(error);
    if(response.statusCode === 200) {
      return callback(null, body);
    } else {
      return callback(body);
    }
  });
};

/**
 * @api {get} /wow/v2/?a=get_current_block Get Current Block
 * @apiVersion 2.0.0
 * @apiName GetCurrentBlock
 * @apiGroup DogeCoin
 * @apiPermission public
 *
 * @apiDescription Returns the current block. This doesn't require an API key.
 *
 * @apiParam {String} a The action to perform
 *
 * @apiExample CURL example:
 *      curl -X GET 'https://dogeapi.com/wow/v2/?a=get_current_block'
 *
 * @apiSuccess {string} currentBlock The current block
 *
 * @apiSuccessExample Success-Response (example):
 *     HTTP/1.1 200 OK
 *     {"data":{"current_block":"110693"}}
 *
 * @apiError (Bad Request 400) NotLive The v2 API is not available for the specified API key given.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {"error":"v2 is not yet live"}
 *
 */
DogeAPI.prototype.getCurrentBlock = function (callback) {
	var self = this;
  request(self._endpoint + 'wow/v2/?a=get_current_block', function (error, response, body) {
    if(error) return callback(error);
    if(response.statusCode === 200) {
      return callback(null, body);
    } else {
      return callback(body);
    }
  });
};

/**
 * @api {get} /wow/v2/?a=get_current_price Get Current Price
 * @apiVersion 2.0.0
 * @apiName GetCurrentPrice
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
 *      curl -X GET 'https://dogeapi.com/wow/v2/?a=get_current_price&convert_to=BTC&amount_doge=1000'
 *
 * @apiSuccess {int} amount The current price of BTC or USD for the Doge amount given.
 *
 * @apiSuccessExample Success-Response (example):
 *     HTTP/1.1 200 OK
 *     {"data":{"amount":0.00211}}
 *
 * @apiError (Bad Request 400) InvalidConversion The conversion unit was not USD or BTC
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {"error":"Invalid Conversion Unit"}
 *
 * @apiError (Bad Request 400) InvalidAmount The amount was not a valid amount of Doge. (Probably not a number)
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {"error":"Invalid Amount"}
 *
 * @apiError (Bad Request 400) NotLive The v2 API is not available for the specified API key given.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {"error":"v2 is not yet live"}
 *
 */
DogeAPI.prototype.getCurrentPrice = function (conversionType, amount, callback) {
	var self = this;
  var apiQuery = 'wow/v2/?a=get_current_price';
  var args = [];
  for(var argCounter = 0; argCounter < arguments.length; argCounter++) {
    args.push(arguments[argCounter]);
  }
  callback = args.pop();
  if(args.length > 0 && !isNaN(parseInt(args[0], 10)) === 'number') {
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
  self._checkAPIKey(function (error) {
    if(error) return callback(error);
    request(self._endpoint + apiQuery, function (error, response, body) {
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
 * @api {get} /wow/v2/?api_key={API_KEY}&a=create_user&user_id={USER_ID} Create User
 * @apiVersion 2.0.0
 * @apiName CreateUser
 * @apiGroup DogeCoin
 * @apiPermission user
 *
 * @apiDescription Creates a new user identified by {USER_ID} and returns their payment address. Each user has only one payment address.
 *
 * @apiParam {String} api_key The user's api key
 * @apiParam {String} a The action to perform
 * @apiParam {String} user_id New user identification
 *
 * @apiExample CURL example:
 *      curl -X GET 'https://dogeapi.com/wow/v2/?api_key={API_KEY}&a=create_user&user_id={USER_ID}'
 *
 * @apiSuccess {String} address The Doge address of the new user
 *
 * @apiSuccessExample Success-Response (example):
 *     HTTP/1.1 200 OK
 *     {"data":{"address":"DQyYRYPKL1Gsp1SEkhPsywzz1GHP9v3XGj"}}
 *
 * @apiError (Unauthorized 401) InvalidAPIKey The user's API key is either missing or invalid.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 401 Unauthorized
 *     {"error":"Invalid API Key"}
 *
 * @apiError (Unauthorized 401) UnauthorizedShibe The reqesting IP is not allowed to make API calls.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 401 Unauthorized
 *     {"error":"Unauthorized Shibe"}
 *
 * @apiError (Bad Request 400) UserIdRequired The user id was not provided in the request.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {"error":"user_id Required"}
 *
 * @apiError (Bad Request 400) UserExists The user id already exists.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {"error":"User Already Exists"}
 *
 * @apiError (Bad Request 400) NotLive The v2 API is not available for the specified API key given.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {"error":"v2 is not yet live"}
 *
 */
DogeAPI.prototype.createUser = function(userID, callback) {
	var self = this;
  if(!userID) return callback('Missing user id.');
  if(!validator.isAlphanumeric(userID)) return callback('Invalid user id.');
  self._checkAPIKey(function (error) {
    if(error) return callback(error);
    request(self._endpoint + '/wow/v2/?api_key=' + self._apikey + '&a=create_user&user_id=' + userID, function (error, response, body) {
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
 * @api {get} /wow/v2/?api_key={API_KEY}&a=get_user_address&user_id={USER_ID} Get User Address
 * @apiVersion 2.0.0
 * @apiName GetUserAddress
 * @apiGroup DogeCoin
 * @apiPermission user
 *
 * @apiDescription Returns the payment address assigned to the user with a given {USER_ID}
 *
 * @apiParam {String} api_key The user's api key
 * @apiParam {String} a The action to perform
 * @apiParam {String} user_id User identification (lowercased)
 *
 * @apiExample CURL example:
 *      curl -X GET 'https://dogeapi.com/wow/v2/?api_key={API_KEY}&a=get_user_address&user_id={USER_ID}'
 *
 * @apiSuccess {String} address The Doge address of the user
 *
 * @apiSuccessExample Success-Response (example):
 *     HTTP/1.1 200 OK
 *     {"data":{"address":"DQPKwzz1GHPXGj9L1GlhPsyvyYRY7sp1SE"}}
 *
 * @apiError (Unauthorized 401) InvalidAPIKey The user's API key is either missing or invalid.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 401 Unauthorized
 *     {"error":"Invalid API Key"}
 *
 * @apiError (Unauthorized 401) UnauthorizedShibe The reqesting IP is not allowed to make API calls.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 401 Unauthorized
 *     {"error":"Unauthorized Shibe"}
 *
 * @apiError (Not Found 404) AddressNotFound The user id was not found on the account.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 404 Not Found
 *     {"error":"Address Not Found"}
 *
 * @apiError (Bad Request 400) NotLive The v2 API is not available for the specified API key given.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {"error":"v2 is not yet live"}
 *
 */
DogeAPI.prototype.getUserAddress = function(userID, callback) {
	var self = this;
  if(!userID) return callback('Missing user id.');
  if(!validator.isAlphanumeric(userID)) return callback('Invalid user id.');
  self._checkAPIKey(function (error) {
    if(error) return callback(error);
    request(self._endpoint + '/wow/v2/?api_key=' + self._apikey + '&a=get_user_address&user_id=' + userID, function (error, response, body) {
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
 * @api {get} /wow/v2/?api_key={API_KEY}&a=get_user_balance&user_id={USER_ID} Get User Balance
 * @apiVersion 2.0.0
 * @apiName GetUserBalance
 * @apiGroup DogeCoin
 * @apiPermission user
 *
 * @apiDescription Returns the payment address assigned to the user with a given {USER_ID}
 *
 * @apiParam {String} api_key The user's api key
 * @apiParam {String} a The action to perform
 * @apiParam {String} user_id User identification (lowercased)
 *
 * @apiExample CURL example:
 *      curl -X GET 'https://dogeapi.com/wow/v2/?api_key={API_KEY}&a=get_user_balance&user_id={USER_ID}'
 *
 * @apiSuccess {String} balance The Doge amount of the user
 *
 * @apiSuccessExample Success-Response (example):
 *     HTTP/1.1 200 OK
 *     {"data":{"balance":"0.00000000"}}
 *
 * @apiError (Unauthorized 401) InvalidAPIKey The user's API key is either missing or invalid.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 401 Unauthorized
 *     {"error":"Invalid API Key"}
 *
 * @apiError (Unauthorized 401) UnauthorizedShibe The reqesting IP is not allowed to make API calls.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 401 Unauthorized
 *     {"error":"Unauthorized Shibe"}
 *
 * @apiError (Not Found 404) UserNotFound The user id was not found on the account.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 404 Not Found
 *     {"error":"User Not Found"}
 *
 * @apiError (Bad Request 400) NotLive The v2 API is not available for the specified API key given.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {"error":"v2 is not yet live"}
 *
 */
DogeAPI.prototype.getUserBalance = function(userID, callback) {
	var self = this;
  if(!userID) return callback('Missing user id.');
  if(!validator.isAlphanumeric(userID)) return callback('Invalid user id.');
  self._checkAPIKey(function (error) {
    if(error) return callback(error);
    request(self._endpoint + '/wow/v2/?api_key=' + self._apikey + '&a=get_user_balance&user_id=' + userID, function (error, response, body) {
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
 * @api {get} /wow/v2/?api_key={API_KEY}&a=withdraw_from_user&user_id={USER_ID}&pin={PIN}&amount_doge={AMOUNT_DOGE}&payment_address={PAYMENT_ADDRESS} Withdraw From User
 * @apiVersion 2.0.0
 * @apiName WithdrawFromUser
 * @apiGroup DogeCoin
 * @apiPermission user
 *
 * @apiDescription Withdraws {AMOUNT_DOGE} from {USER_ID} to {PAYMENT_ADDRESS}. Requires your {PIN}. For now this must be more than 5 doge, and you must have enough extra in your wallet to pay all network fees (another 1-3 doge). DogeAPI takes a 0.5% fee when withdrawing.
 *
 * @apiParam {String} api_key The user's api key
 * @apiParam {String} a The action to perform
 * @apiParam {int} amount_doge The amount to withdraw
 * @apiParam {String} user_id User identification (lowercased)
 * @apiParam {int} pin Your account pin number
 * @apiParam {String} payment_address The account to withdraw to
 *
 * @apiExample CURL example:
 *      curl -X GET 'https://dogeapi.com/wow/v2/?api_key={API_KEY}&a=withdraw_from_user&user_id={USER_ID}&pin={PIN}&amount_doge={AMOUNT_DOGE}&payment_address={PAYMENT_ADDRESS}'
 *
 * @apiSuccess {String} transaction The unique transaction id on the market
 *
 * @apiSuccessExample Success-Response (example):
 *     HTTP/1.1 200 OK
 *     {"data":{"txid": "52c5a2923b113ef07c47b077ba8bf3a03381c687f218f6b326773892565d6963"}}
 *
 * @apiError (Unauthorized 401) InvalidAPIKey The user's API key is either missing or invalid.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 401 Unauthorized
 *     {"error":"Invalid API Key"}
 *
 * @apiError (Unauthorized 401) UnauthorizedShibe The user's pin was invalid
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 401 Unauthorized
 *     {"error":"Unauthorized Shibe"}
 *
 * @apiError (Bad Request 400) NotEnoughDoge The user does not have enough Doge in their account.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {"error":"Not Enough Doge"}
 *
 * @apiError (Bad Request 400) AmountDogeRequired The amount of doge is missing from the request.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {"error":"amount_doge required"}
 *
 * @apiError (Bad Request 400) AtLeast5Doge The amount of doge withdrawing is lower than allowed amount.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {"error":"Must Withdraw At Least 5 Doge"}
 *
 *
 * @apiError (Bad Request 400) NotLive The v2 API is not available for the specified API key given.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {"error":"v2 is not yet live"}
 *
 */
DogeAPI.prototype.withdrawFromUser = function(userID, paymentAddress, amount, pin, callback) {
	var self = this;
  if(!userID) return callback('Missing user id.');
  if(!paymentAddress) return callback('Missing payment address.');
  if(!amount) return callback('Missing amount to withdraw.');
  if(!pin) return callback('Missing account PIN.');
  if(!validator.isAlphanumeric(userID)) return callback('Invalid user id.');
  self._checkAPIKey(function (error) {
    if(error) return callback(error);
    request(self._endpoint + '/wow/v2/?api_key=' + self._apikey + '&a=withdraw_from_user&user_id=' + userID + '&pin=' + pin + '&amount_doge=' + amount + '&payment_address=' + paymentAddress, function (error, response, body) {
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
 * @api {get} /wow/v2/?api_key={API_KEY}&a=move_to_user&to_user_id={TO_USER_ID}&from_user_id={FROM_USER_ID}&amount_doge={AMOUNT_DOGE} Move From User
 * @apiVersion 2.0.0
 * @apiName MoveToUser
 * @apiGroup DogeCoin
 * @apiPermission user
 *
 * @apiDescription Moves {AMOUNT_DOGE} to user with ID {TO_USER_ID} from user with ID {FROM_USER_ID}. There is no network fee for this transaction, just the DogeAPI 0.5% fee.
 *
 * @apiParam {String} api_key The user's api key
 * @apiParam {String} a The action to perform
 * @apiParam {int} amount_doge The amount to withdraw
 * @apiParam {String} to_user_id User identification of the receiver (lowercased)
 * @apiParam {String} from_user_id User identification of the sender (lowercased)
 *
 * @apiExample CURL example:
 *      curl -X GET 'https://dogeapi.com/wow/v2/?api_key={API_KEY}&a=move_to_user&to_user_id={TO_USER_ID}&from_user_id={FROM_USER_ID}&amount_doge={AMOUNT_DOGE}'
 *
 * @apiSuccess {Double} fee The fee for the transaction
 *
 * @apiSuccessExample Success-Response (example):
 *     HTTP/1.1 200 OK
 *     {"data":{"success":{"fee":0.05}}}
 *
 * @apiError (Unauthorized 401) InvalidAPIKey The user's API key is either missing or invalid.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 401 Unauthorized
 *     {"error":"Invalid API Key"}
 *
 * @apiError (Unauthorized 401) UnauthorizedShibe The user's pin was invalid
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 401 Unauthorized
 *     {"error":"Unauthorized Shibe"}
 *
 * @apiError (Bad Request 400) NotEnoughDoge The user does not have enough Doge in their account.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {"error":"Not Enough Doge"}
 *
 * @apiError (Bad Request 400) AmountDogeRequired The amount of doge is missing from the request.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {"error":"amount_doge required"}
 *
 * @apiError (Bad Request 400) AtLeast5Doge The amount of doge withdrawing is lower than allowed amount.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {"error":"Must Withdraw At Least 5 Doge"}
 *
 *
 * @apiError (Bad Request 400) NotLive The v2 API is not available for the specified API key given.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {"error":"v2 is not yet live"}
 *
 */
DogeAPI.prototype.moveToUser = function(toUserID, fromUserID, amount, callback) {
	var self = this;
  if(!toUserID) return callback('Missing user id to send to.');
  if(!fromUserID) return callback('Missing user id to send from.');
  if(!amount) return callback('Missing amount to move.');
  self._checkAPIKey(function (error) {
    if(error) return callback(error);
    request(self._endpoint + '/wow/v2/?api_key=' + self._apikey + '&a=move_to_user&to_user_id=' + toUserID + '&from_user_id=' + fromUserID + '&amount_doge=' + amount, function (error, response, body) {
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
 * @api {get} /wow/v2/?api_key={API_KEY}&a=get_users Get Users
 * @apiVersion 2.0.0
 * @apiName GetUsers
 * @apiGroup DogeCoin
 * @apiPermission user
 *
 * @apiDescription Returns a list of users asssociated with your account with their balances.
 *
 * @apiParam {String} api_key The user's api key
 * @apiParam {String} a The action to perform
 *
 * @apiExample CURL example:
 *      curl -X GET 'https://dogeapi.com/wow/v2/?api_key={API_KEY}&a=get_users'
 *
 * @apiSuccess {Array} users The list of users
 * @apiSuccess {String} user_id The user identification (lowercased)
 * @apiSuccess {String} payment_address The user's Doge address.
 * @apiSuccess {String} user_balance The user's Doge amount in their address
 *
 * @apiSuccessExample Success-Response (example):
 *     HTTP/1.1 200 OK
 *     {"data":{"users":[{"user_id":"testuser","payment_address":"DQRYSEkhPsywzz1v3XGjGLPKLyY1Gsp1P9","user_balance":"0.00000000"},{"user_id":"1","payment_address":"DGFDjNRaaDQd9Vh7iDQ1MseRuL3tCta2LN","user_balance":"0.00000000"}]}}
 *
 * @apiError (Unauthorized 401) InvalidAPIKey The user's API key is either missing or invalid.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 401 Unauthorized
 *     {"error":"Invalid API Key"}
 *
 * @apiError (Unauthorized 401) UnauthorizedShibe The user's pin was invalid
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 401 Unauthorized
 *     {"error":"Unauthorized Shibe"}
 *
 * @apiError (Bad Request 400) NotLive The v2 API is not available for the specified API key given.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {"error":"v2 is not yet live"}
 *
 */
DogeAPI.prototype.getUsers = function(callback) {
	var self = this;
  self._checkAPIKey(function (error) {
    if(error) return callback(error);
    request(self._endpoint + '/wow/v2/?api_key=' + self._apikey + '&a=get_users', function (error, response, body) {
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
 * @api {get} /wow/v2/?api_key={API_KEY}&a=get_transactions&num={NUMBER}&type={TYPE}&user_id={USER_ID}&payment_address={PAYMENT_ADDRESS}&label={LABEL} Get Transactions
 * @apiVersion 2.0.0
 * @apiName GetTransactions
 * @apiGroup DogeCoin
 * @apiPermission user
 *
 * @apiDescription Returns a list of users asssociated with your account with their balances.
 *
 * @apiParam {String} api_key The user's api key
 * @apiParam {String} a The action to perform
 * @apiParam {int} num The number of transactions
 * @apiParam {String} type The type of transaction. This can be "receive", "send", "move", or "fee"
 * @apiParam {String} user_id (Optional) The user identification (lowercased)
 * @apiParam {String} payment_address (Optional) A Doge address
 * @apiParam {String} label (Optional) A label for one of the Doge addresses on the account
 *
 * @apiExample CURL example:
 *      curl -X GET 'https://dogeapi.com/wow/v2/?api_key={API_KEY}&a=get_transactions&num={NUMBER}&type={TYPE}&user_id={USER_ID}'
 *
 * @apiExample CURL example:
 *      curl -X GET 'https://dogeapi.com/wow/v2/?api_key={API_KEY}&a=get_transactions&num={NUMBER}&type={TYPE}&payment_address={PAYMENT_ADDRESS}'
 *
 * @apiExample CURL example:
 *      curl -X GET 'https://dogeapi.com/wow/v2/?api_key={API_KEY}&a=get_transactions&num={NUMBER}&type={TYPE}&label={LABEL}'
 *
 * @apiSuccess {Array} transactions The list of transactions
 * @apiSuccess {String} txid The transaction id
 * @apiSuccess {String} amount The amount in the transaction
 * @apiSuccess {String} transaction_label The label for the transaction
 * @apiSuccess {int} transaction_time The epoch time of the transaction
 * @apiSuccess {String} address The doge address that participated in the transaction
 * @apiSuccess {String} transaction_type The type of transaction
 *
 * @apiSuccessExample Success-Response (example):
 *     HTTP/1.1 200 OK
 *     {"data":{"transactions":[{"txid":"309eb1b0e78aa194662f08cff24927c3","amount":"5.97000000","transaction_label":"TestTransaction","transaction_time":1392834438,"address":"DQyYRYPKL1Gsp1SEkhPsywzz1GHP9v3XGj","transaction_type":"wallet"}]}}
 *
 * @apiError (Unauthorized 401) InvalidAPIKey The user's API key is either missing or invalid.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 401 Unauthorized
 *     {"error":"Invalid API Key"}
 *
 * @apiError (Unauthorized 401) UnauthorizedShibe The user's pin was invalid
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 401 Unauthorized
 *     {"error":"Unauthorized Shibe"}
 *
 * @apiError (Bad Request 400) NumRequired The num parameter was missing.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {"error":"num Required"}
 *
 * @apiError (Bad Request 400) TypeRequired The type of transaction parameter was missing.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {"error":"type Required"}
 *
 * @apiError (Not Found 404) InvalidType The type of transaction parameter was invalid. Should be "receive", "send", "move", or "fee".
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 404 Not Found
 *     {"error":"Transaction type is invalid"}
 *
 * @apiError (Bad Request 400) NotLive The v2 API is not available for the specified API key given.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {"error":"v2 is not yet live"}
 *
 */
DogeAPI.prototype.getTransactions = function(number, type, option, callback) {
	var self = this;
  // Get arguments
  var args = [];
  for(var argCounter = 0; argCounter < arguments.length; argCounter++) {
    args.push(arguments[argCounter]);
  }
  // Get the number
  number = args.shift();
  // Get the type
  type = args.shift();
  if(!number) return callback('Missing transaction number to match.');
  // Check type
  if(!type) return callback('Missing type of transaction to check.');
  if(typeof(type) !== 'string') return callback('Invalid type.');
  var isTypeValid = false;
  switch(type.toLowerCase()) {
    case 'receive':
    case 'send':
    case 'move':
    case 'fee':
      isTypeValid = true;
    break;
    default:
    break;
  }
  if(!isTypeValid) return callback('Invalid type.');

  // Get callback function
  callback = args.pop();

  // Find out if we have options or not
  var hasOption = false;
  if(args.length > 0 && typeof(args[0]) === 'object') {
    option = args.shift();
    hasOption = true;
  } else {
    option = null;
  }
  if(typeof(option) !== 'object') return callback('Invalid option, please use the form {type: "label", value: "myLabel"}.');

  var apiQuery = '/wow/v2/?api_key=' + self._apikey + '&a=get_transactions&num=' + number + '&type=' + type;
  if(hasOption) {
    var isOptionValid = false;
    switch(option.type.toLowerCase()) {
      case 'label':
        apiQuery += '&label=' + option.value;
        isOptionValid = true;
      break;
      case 'paymentaddress':
        apiQuery += '&payment_address=' + option.value;
        isOptionValid = true;
      break;
      case 'userid':
        apiQuery += '&user_id=' + option.value;
        isOptionValid = true;
      break;
      default:
      break;
    }
    if(!isOptionValid) return callback('Invalid option type.');
  }
  self._checkAPIKey(function (error) {
    if(error) return callback(error);
    request(self._endpoint + apiQuery, function (error, response, body) {
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
 * @api {get} /wow/v2/?a=get_network_hashrate Get Network Hashrate
 * @apiVersion 2.0.0
 * @apiName GetNetworkHashrate
 * @apiGroup DogeCoin
 * @apiPermission public
 *
 * @apiDescription Returns the current network hashrate. This doesn't require an API key.
 *
 * @apiParam {String} a The action to perform
 *
 * @apiExample CURL example:
 *      curl -X GET 'https://dogeapi.com/wow/v2/?a=get_network_hashrate'
 *
 * @apiSuccess {String} network_hashrate The current hashrate of the network
 *
 * @apiSuccessExample Success-Response (example):
 *     HTTP/1.1 200 OK
 *    {"data":{"network_hashrate":"77615954075"}}
 *
 * @apiError (Bad Request 400) NotLive The v2 API is not available for the specified API key given.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {"error":"v2 is not yet live"}
 *
 */
DogeAPI.prototype.getNetworkHashRate = function(callback) {
	var self = this;
  request(self._endpoint + '/wow/v2/?a=get_network_hashrate', function (error, response, body) {
    if(error) return callback(error);
    if(response.statusCode === 200) {
      return callback(null, body);
    } else {
      return callback(body);
    }
  });
};

/**
 * @api {get} /wow/v2/?a=get_info Get Info
 * @apiVersion 2.0.0
 * @apiName GetInfo
 * @apiGroup DogeCoin
 * @apiPermission public
 *
 * @apiDescription Returns current information, including price in USD/BTC, block count, difficulty, 5 minute price change, network hashrate, and API version. This doesn't require an API key.
 *
 * @apiParam {String} a The action to perform
 *
 * @apiExample CURL example:
 *      curl -X GET 'https://dogeapi.com/wow/v2/?a=get_info'
 *
 * @apiSuccess {Object} info The current information
 * @apiSuccess {String} difficulty The current network difficulty
 * @apiSuccess {String} network_hashrate The current network hashrate
 * @apiSuccess {String} current_block The current block
 * @apiSuccess {String} doge_usd The price in USD per 1 Doge.
 * @apiSuccess {String} doge_btc The price in USD per 1 Bitcoin.
 * @apiSuccess {String} 5min_btc_change Fluxuation in Doge/Bitcoin pricing?
 * @apiSuccess {String} 5min_btc_change Fluxuation in Doge/USD pricing?
 * @apiSuccess {String} api_version The current API version
 *
 * @apiSuccessExample Success-Response (example):
 *     HTTP/1.1 200 OK
 *    {"data":{"info":{"difficulty":"1190.35","network_hashrate":"77803335203","current_block":"110773","doge_usd":"0.00119679","doge_btc":"0.00000210","5min_btc_change":"0.00000000","5min_usd_change":"0.00000000","api_version":"2"}}}
 *
 * @apiError (Bad Request 400) NotLive The v2 API is not available for the specified API key given.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 400 Bad Request
 *     {"error":"v2 is not yet live"}
 *
 */
DogeAPI.prototype.getInfo = function(callback) {
	var self = this;
  request(self._endpoint + '/wow/v2/?a=get_info', function (error, response, body) {
    if(error) return callback(error);
    if(response.statusCode === 200) {
      return callback(null, body);
    } else {
      return callback(body);
    }
  });
};

//Verifies that the incoming address is legitimate
DogeAPI.prototype._verifyAddress = function (dogeAddr, callback) {
	var self = this;
  if(dogeAddr.length !== 34 || dogeAddr[0] !== 'D') {
    return callback('Invalid doge address.');
  }
  self._dogeChainVerify(dogeAddr, function (error) {
    if(error && error.code === 'ETIMEOUT') {
      return callback(); // We could not query dogechain so we will allow DogeAPI to deal with more verification
    } else if(error) {
      return callback(error);
    }
    return callback();
  });
};

// Queries DogeChain to verify the legitimacy of an address
DogeAPI.prototype._dogeChainVerify = function(dogeAddr, callback) {
	var self = this;
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
DogeAPI.prototype._checkAPIKey = function (callback) {
	var self = this;
  if(self._apikey === undefined || self._apikey === '' || self._apikey === null) {
    return callback('Missing API key.');
  }
  return callback();
};

module.exports = DogeAPI;