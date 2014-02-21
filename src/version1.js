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

/**
 * @api {get} /wow/?api_key={API_KEY}&a=get_balance Get Balance
 * @apiVersion 1.0.0
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

/**
 * @api {get} /wow/?api_key={API_KEY}&a=withdraw&amount={AMOUNT}&payment_address={PAYMENT_ADDRESS} Withdraw
 * @apiVersion 1.0.0
 * @apiName Withdraw
 * @apiGroup DogeCoin
 * @apiPermission user
 *
 * @apiDescription Withdraws {AMOUNT} doge to a {PAYMENT_ADDRESS} you specify.
 *
 * @apiParam {String} api_key The user's api key
 * @apiParam {String} a The action to perform
 * @apiParam {int} amount The amount to withdraw
 * @apiParam {String} payment_address The account to withdraw to
 *
 * @apiExample CURL example:
 *      curl -X GET 'https://dogeapi.com/wow/?api_key={API_KEY}&a=withdraw&amount={AMOUNT}&payment_address={PAYMENT_ADDRESS}'
 *
 * @apiSuccess {string} transaction The unique transaction id on the market
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

/**
 * @api {get} /wow/?api_key={API_KEY}&a=get_new_address&address_label={ADDRESS_LABEL} Get New Address
 * @apiVersion 1.0.0
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
 *      curl -X GET 'https://dogeapi.com/wow/?api_key={API_KEY}&a=get_new_address&address_label={ADDRESS_LABEL}'
 *
 * @apiSuccess {String} address The address created
 *
 * @apiSuccessExample Success-Response (example):
 *     HTTP/1.1 200 OK
 *     "DQrzy6eccdPZ4n3Hi6oD6XZ4ndBFRX"
 *
 * @apiError (Unauthorized 401) InvalidAPIKey The user's API key is either missing or invalid.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 401 Unauthorized
 *     "Invalid API Key"
 *
 */

/**
 * @api {get} /wow/?api_key={API_KEY}&a=get_my_addresses Get My Addresses
 * @apiVersion 1.0.0
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
 *     ["DQ6eccdPZ4n3Hi6orzyD6XZ6XF24ndBFRX", "DQrzy5eci6oZ4n9HD6XFRX4dnBZ4ncdPdB"]
 *
 * @apiError (Success 200) InvalidAPIKey The user's API key is either missing or invalid.
 *
 * @apiErrorExample Error-Response (example):
 *     HTTP/1.1 200 OK
 *     "Invalid API Key"
 *
 */

/**
 * @api {get} /wow/?api_key={API_KEY}&a=get_address_received&payment_address={PAYMENT_ADDRESS} Get Address Received
 * @apiVersion 1.0.0
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

/**
 * @api {get} /wow/?api_key={API_KEY}&a=get_address_by_label&address_label={ADDRESS_LABEL} Get Address By Label
 * @apiVersion 1.0.0
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

/**
 * @api {get} /wow/?a=get_current_block Get Current Block
 * @apiVersion 1.0.0
 * @apiName GetCurrentBlock
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

/**
 * @api {get} /wow/?a=get_current_price Get Current Price
 * @apiVersion 1.0.0
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