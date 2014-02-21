define({ api: [
  {
    "type": "get",
    "url": "/wow/v2/?api_key={API_KEY}&a=create_user&user_id={USER_ID}",
    "title": "Create User",
    "version": "2.0.0",
    "name": "CreateUser",
    "group": "DogeCoin",
    "permission": {
      "name": "user",
      "title": "Authenticated access is required.",
      "description": "An API key is required.\n"
    },
    "description": "Creates a new user identified by {USER_ID} and returns their payment address. Each user has only one payment address.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "api_key",
            "optional": false,
            "description": "The user's api key"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "a",
            "optional": false,
            "description": "The action to perform"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "user_id",
            "optional": false,
            "description": "New user identification"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "CURL example:",
        "content": "    curl -X GET 'https://dogeapi.com/wow/v2/?api_key={API_KEY}&a=create_user&user_id={USER_ID}'\n"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "field": "address",
            "optional": false,
            "description": "The Doge address of the new user"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (example):",
          "content": "   HTTP/1.1 200 OK\n   {\"data\":{\"address\":\"DQyYRYPKL1Gsp1SEkhPsywzz1GHP9v3XGj\"}}\n"
        }
      ]
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "field": "InvalidAPIKey",
            "optional": false,
            "description": "The user's API key is either missing or invalid."
          },
          {
            "group": "Unauthorized 401",
            "field": "UnauthorizedShibe",
            "optional": false,
            "description": "The reqesting IP is not allowed to make API calls."
          }
        ],
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "field": "UserIdRequired",
            "optional": false,
            "description": "The user id was not provided in the request."
          },
          {
            "group": "Bad Request 400",
            "field": "UserExists",
            "optional": false,
            "description": "The user id already exists."
          },
          {
            "group": "Bad Request 400",
            "field": "NotLive",
            "optional": false,
            "description": "The v2 API is not available for the specified API key given."
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 401 Unauthorized\n   {\"error\":\"Invalid API Key\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 401 Unauthorized\n   {\"error\":\"Unauthorized Shibe\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 400 Bad Request\n   {\"error\":\"user_id Required\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 400 Bad Request\n   {\"error\":\"User Already Exists\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 400 Bad Request\n   {\"error\":\"v2 is not yet live\"}\n"
        }
      ]
    },
    "filename": "src/index.js"
  },
  {
    "type": "get",
    "url": "/wow/v2/?api_key={API_KEY}&a=get_address_by_label&address_label={ADDRESS_LABEL}",
    "title": "Get Address By Label",
    "version": "2.0.0",
    "name": "GetAddressByLabel",
    "group": "DogeCoin",
    "permission": {
      "name": "user",
      "title": "Authenticated access is required.",
      "description": "An API key is required.\n"
    },
    "description": "Returns the payment address for the given {ADDRESS_LABEL}",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "api_key",
            "optional": false,
            "description": "The user's api key"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "a",
            "optional": false,
            "description": "The action to perform"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "address_label",
            "optional": false,
            "description": "The address label to check the amount with"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "CURL example:",
        "content": "    curl -X GET 'https://dogeapi.com/wow/v2/?api_key={API_KEY}&a=get_address_by_label&address_label={ADDRESS_LABEL}'\n"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "field": "address",
            "optional": false,
            "description": "The addresses on your account."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (example):",
          "content": "   HTTP/1.1 200 OK\n   {\"data\":{\"addresses\":[\"DQ6eccdPZ4n3Hi6orzyD6XZ6XF24ndBFRX\"]}}\n"
        }
      ]
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "field": "InvalidAPIKey",
            "optional": false,
            "description": "The user's API key is either missing or invalid."
          },
          {
            "group": "Unauthorized 401",
            "field": "UnauthorizedShibe",
            "optional": false,
            "description": "The reqesting IP is not allowed to make API calls."
          }
        ],
        "Not Found 404": [
          {
            "group": "Not Found 404",
            "field": "InvalidAddress",
            "optional": false,
            "description": "The user's address key is invalid."
          }
        ],
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "field": "NotLive",
            "optional": false,
            "description": "The v2 API is not available for the specified API key given."
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 401 Unauthorized\n   {\"error\":\"Invalid API Key\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 404 Not Found\n   {\"error\":\"No Addresses Found\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 401 Unauthorized\n   {\"error\":\"Unauthorized Shibe\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 400 Bad Request\n   {\"error\":\"v2 is not yet live\"}\n"
        }
      ]
    },
    "filename": "src/index.js"
  },
  {
    "type": "get",
    "url": "/wow/?api_key={API_KEY}&a=get_address_by_label&address_label={ADDRESS_LABEL}",
    "title": "Get Address By Label",
    "version": "1.0.0",
    "name": "GetAddressByLabel",
    "group": "DogeCoin",
    "permission": {
      "name": "user",
      "title": "Authenticated access is required.",
      "description": "An API key is required.\n"
    },
    "description": "Returns the payment address for the given {ADDRESS_LABEL}",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "api_key",
            "optional": false,
            "description": "The user's api key"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "a",
            "optional": false,
            "description": "The action to perform"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "address_label",
            "optional": false,
            "description": "The address label to check the amount with"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "CURL example:",
        "content": "    curl -X GET 'https://dogeapi.com/wow/?api_key={API_KEY}&a=get_address_by_label&address_label={ADDRESS_LABEL}'\n"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "field": "address",
            "optional": false,
            "description": "The addresses on your account."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (example):",
          "content": "   HTTP/1.1 200 OK\n   \"DQ6eccdPZ4n3Hi6orzyD6XZ6XF24ndBFRX\"\n"
        }
      ]
    },
    "error": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "field": "InvalidAPIKey",
            "optional": false,
            "description": "The user's API key is either missing or invalid."
          },
          {
            "group": "Success 200",
            "field": "InvalidAddress",
            "optional": false,
            "description": "The user's address key is invalid."
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 200 OK\n   \"Invalid API Key\"\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 200 OK\n   null\n"
        }
      ]
    },
    "filename": "src/version1.js"
  },
  {
    "type": "get",
    "url": "/wow/v2/?api_key={API_KEY}&a=get_address_received&payment_address={PAYMENT_ADDRESS}",
    "title": "Get Address Received",
    "version": "2.0.0",
    "name": "GetAddressReceived",
    "group": "DogeCoin",
    "permission": {
      "name": "user",
      "title": "Authenticated access is required.",
      "description": "An API key is required.\n"
    },
    "description": "Returns the current amount received to all addresses with {ADDRESS_LABEL} or {PAYMENT_ADDRESS}.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "api_key",
            "optional": false,
            "description": "The user's api key"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "a",
            "optional": false,
            "description": "The action to perform"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "payment_address",
            "optional": false,
            "description": "The payment address to check the amount with"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "address_label",
            "optional": false,
            "description": "The address label to check the amount with"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "CURL example:",
        "content": "    curl -X GET 'https://dogeapi.com/wow/v2/?api_key={API_KEY}&a=get_address_received&payment_address={PAYMENT_ADDRESS}'\n"
      },
      {
        "title": "CURL example:",
        "content": "    curl -X GET 'https://dogeapi.com/wow/v2/?api_key={API_KEY}&a=get_address_received&address_label={ADDRESS_LABEL}'\n"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "field": "Received",
            "optional": false,
            "description": "The amount of Doge received to the address(es) requested."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (example):",
          "content": "   HTTP/1.1 200 OK\n   {\"data\":{\"received\":18.95245109}}\n"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "field": "AddressPaymentRequireed",
            "optional": false,
            "description": "Missing either address_label or payment_address"
          },
          {
            "group": "Bad Request 400",
            "field": "NotLive",
            "optional": false,
            "description": "The v2 API is not available for the specified API key given."
          }
        ],
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "field": "InvalidAPIKey",
            "optional": false,
            "description": "The user's API key is either missing or invalid."
          },
          {
            "group": "Unauthorized 401",
            "field": "UnauthorizedShibe",
            "optional": false,
            "description": "The reqesting IP is not allowed to make API calls."
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 400 Bad Request\n   {\"error\":\"address_label or payment_address Required\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 401 Unauthorized\n   {\"error\":\"Invalid API Key\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 401 Unauthorized\n   {\"error\":\"Unauthorized Shibe\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 400 Bad Request\n   {\"error\":\"v2 is not yet live\"}\n"
        }
      ]
    },
    "filename": "src/index.js"
  },
  {
    "type": "get",
    "url": "/wow/?api_key={API_KEY}&a=get_address_received&payment_address={PAYMENT_ADDRESS}",
    "title": "Get Address Received",
    "version": "1.0.0",
    "name": "GetAddressReceived",
    "group": "DogeCoin",
    "permission": {
      "name": "user",
      "title": "Authenticated access is required.",
      "description": "An API key is required.\n"
    },
    "description": "Returns the current amount received to all addresses with {ADDRESS_LABEL} or {PAYMENT_ADDRESS}.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "api_key",
            "optional": false,
            "description": "The user's api key"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "a",
            "optional": false,
            "description": "The action to perform"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "payment_address",
            "optional": false,
            "description": "The payment address to check the amount with"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "address_label",
            "optional": false,
            "description": "The address label to check the amount with"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "CURL example:",
        "content": "    curl -X GET 'https://dogeapi.com/wow/?api_key={API_KEY}&a=get_address_received&payment_address={PAYMENT_ADDRESS}'\n"
      },
      {
        "title": "CURL example:",
        "content": "    curl -X GET 'https://dogeapi.com/wow/?api_key={API_KEY}&a=get_address_received&address_label={ADDRESS_LABEL}'\n"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "field": "addresses",
            "optional": false,
            "description": "The list of addresses on your account."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (example):",
          "content": "   HTTP/1.1 200 OK\n   [\"DQ6eccdPZ4n3Hi6orzyD6XZ6XF24ndBFRX\", \"DQrzy5eci6oZ4n9HD6XFRX4dnBZ4ncdPdB\"]\n"
        }
      ]
    },
    "error": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "field": "InvalidAPIKey",
            "optional": false,
            "description": "The user's API key is either missing or invalid."
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 200 OK\n   \"Invalid API Key\"\n"
        }
      ]
    },
    "filename": "src/version1.js"
  },
  {
    "type": "get",
    "url": "/wow/v2/?api_key={API_KEY}&a=get_balance",
    "title": "Get Balance",
    "version": "2.0.0",
    "name": "GetBalance",
    "group": "DogeCoin",
    "permission": {
      "name": "user",
      "title": "Authenticated access is required.",
      "description": "An API key is required.\n"
    },
    "description": "Returns the DOGE balance of your entire account to 8 decimal places.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "api_key",
            "optional": false,
            "description": "The user's api key"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "a",
            "optional": false,
            "description": "The action to perform"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "CURL example:",
        "content": "    curl -X GET 'https://dogeapi.com/wow/v2/?api_key={API_KEY}&a=get_balance'\n"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "field": "balance",
            "optional": false,
            "description": "The amount in the entire account."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (example):",
          "content": "   HTTP/1.1 200 OK\n   {\"data\":{\"balance\":\"18.95245109\"}}\n"
        }
      ]
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "field": "InvalidAPIKey",
            "optional": false,
            "description": "The user's API key is either missing or invalid."
          }
        ],
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "field": "NotLive",
            "optional": false,
            "description": "The v2 API is not available for the specified API key given."
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 401 Unauthorized\n   {\"error\":\"Invalid API Key\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 400 Bad Request\n   {\"error\":\"v2 is not yet live\"}\n"
        }
      ]
    },
    "filename": "src/index.js"
  },
  {
    "type": "get",
    "url": "/wow/?api_key={API_KEY}&a=get_balance",
    "title": "Get Balance",
    "version": "1.0.0",
    "name": "GetBalance",
    "group": "DogeCoin",
    "permission": {
      "name": "user",
      "title": "Authenticated access is required.",
      "description": "An API key is required.\n"
    },
    "description": "Returns the DOGE balance of your entire account to 8 decimal places.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "api_key",
            "optional": false,
            "description": "The user's api key"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "a",
            "optional": false,
            "description": "The action to perform"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "CURL example:",
        "content": "    curl -X GET 'https://dogeapi.com/wow/?api_key={API_KEY}&a=get_balance'\n"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "int",
            "field": "amount",
            "optional": false,
            "description": "The amount in the entire account"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (example):",
          "content": "   HTTP/1.1 200 OK\n   18.95245109\n"
        }
      ]
    },
    "error": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "field": "InvalidAPIKey",
            "optional": false,
            "description": "The user's API key is either missing or invalid."
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 200 OK\n   \"Invalid API Key\"\n"
        }
      ]
    },
    "filename": "src/version1.js"
  },
  {
    "type": "get",
    "url": "/wow/v2/?a=get_current_block",
    "title": "Get Current Block",
    "version": "2.0.0",
    "name": "GetCurrentBlock",
    "group": "DogeCoin",
    "permission": {
      "name": "public",
      "title": "This information is publicly accessible.",
      "description": "No authentication is required.\n"
    },
    "description": "Returns the current block. This doesn't require an API key.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "a",
            "optional": false,
            "description": "The action to perform"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "CURL example:",
        "content": "    curl -X GET 'https://dogeapi.com/wow/v2/?a=get_current_block'\n"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "field": "currentBlock",
            "optional": false,
            "description": "The current block"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (example):",
          "content": "   HTTP/1.1 200 OK\n   {\"data\":{\"current_block\":\"110693\"}}\n"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "field": "NotLive",
            "optional": false,
            "description": "The v2 API is not available for the specified API key given."
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 400 Bad Request\n   {\"error\":\"v2 is not yet live\"}\n"
        }
      ]
    },
    "filename": "src/index.js"
  },
  {
    "type": "get",
    "url": "/wow/?a=get_current_block",
    "title": "Get Current Block",
    "version": "1.0.0",
    "name": "GetCurrentBlock",
    "group": "DogeCoin",
    "permission": {
      "name": "public",
      "title": "This information is publicly accessible.",
      "description": "No authentication is required.\n"
    },
    "description": "Returns the current block. This doesn't require an API key.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "a",
            "optional": false,
            "description": "The action to perform"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "CURL example:",
        "content": "    curl -X GET 'https://dogeapi.com/wow/?a=get_current_block'\n"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "int",
            "field": "currentBlock",
            "optional": false,
            "description": "The current block"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (example):",
          "content": "   HTTP/1.1 200 OK\n   39405\n"
        }
      ]
    },
    "filename": "src/version1.js"
  },
  {
    "type": "get",
    "url": "/wow/v2/?a=get_current_price",
    "title": "Get Current Price",
    "version": "2.0.0",
    "name": "GetCurrentPrice",
    "group": "DogeCoin",
    "permission": {
      "name": "public",
      "title": "This information is publicly accessible.",
      "description": "No authentication is required.\n"
    },
    "description": "Returns the current price in USD or BTC. This doesn't require an API key.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "a",
            "optional": false,
            "description": "The action to perform"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "convert_to",
            "optional": false,
            "description": "To convert to USD or BTC (Defaults to USD)"
          },
          {
            "group": "Parameter",
            "type": "int",
            "field": "amount_doge",
            "optional": false,
            "description": "The amount of Doge to convert (Defaults to 1 Doge.)"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "CURL example:",
        "content": "    curl -X GET 'https://dogeapi.com/wow/v2/?a=get_current_price&convert_to=BTC&amount_doge=1000'\n"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "int",
            "field": "amount",
            "optional": false,
            "description": "The current price of BTC or USD for the Doge amount given."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (example):",
          "content": "   HTTP/1.1 200 OK\n   {\"data\":{\"amount\":0.00211}}\n"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "field": "InvalidConversion",
            "optional": false,
            "description": "The conversion unit was not USD or BTC"
          },
          {
            "group": "Bad Request 400",
            "field": "InvalidAmount",
            "optional": false,
            "description": "The amount was not a valid amount of Doge. (Probably not a number)"
          },
          {
            "group": "Bad Request 400",
            "field": "NotLive",
            "optional": false,
            "description": "The v2 API is not available for the specified API key given."
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 400 Bad Request\n   {\"error\":\"Invalid Conversion Unit\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 400 Bad Request\n   {\"error\":\"Invalid Amount\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 400 Bad Request\n   {\"error\":\"v2 is not yet live\"}\n"
        }
      ]
    },
    "filename": "src/index.js"
  },
  {
    "type": "get",
    "url": "/wow/?a=get_current_price",
    "title": "Get Current Price",
    "version": "1.0.0",
    "name": "GetCurrentPrice",
    "group": "DogeCoin",
    "permission": {
      "name": "public",
      "title": "This information is publicly accessible.",
      "description": "No authentication is required.\n"
    },
    "description": "Returns the current price in USD or BTC. This doesn't require an API key.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "a",
            "optional": false,
            "description": "The action to perform"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "convert_to",
            "optional": false,
            "description": "To convert to USD or BTC (Defaults to USD)"
          },
          {
            "group": "Parameter",
            "type": "int",
            "field": "amount_doge",
            "optional": false,
            "description": "The amount of Doge to convert (Defaults to 1 Doge.)"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "CURL example:",
        "content": "    curl -X GET 'https://dogeapi.com/wow/?a=get_current_price&convert_to=BTC&amount_doge=1000'\n"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "int",
            "field": "currentPrice",
            "optional": false,
            "description": "The current price of BTC or USD for the Doge amount given."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (example):",
          "content": "   HTTP/1.1 200 OK\n   0.00206000\n"
        }
      ]
    },
    "error": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "field": "InvalidConversion",
            "optional": false,
            "description": "The conversion unit was not USD or BTC"
          },
          {
            "group": "Success 200",
            "field": "InvalidAmount",
            "optional": false,
            "description": "The amount was not a valid amount of Doge. (Probably not a number)"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 200 OK\n   \"invalid conversion unit\"\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 200 OK\n   \"Invalid Amount\"\n"
        }
      ]
    },
    "filename": "src/version1.js"
  },
  {
    "type": "get",
    "url": "/wow/v2/?a=get_difficulty",
    "title": "Get Difficulty",
    "version": "2.0.0",
    "name": "GetDifficulty",
    "group": "DogeCoin",
    "permission": {
      "name": "public",
      "title": "This information is publicly accessible.",
      "description": "No authentication is required.\n"
    },
    "description": "Returns the current difficulty. This doesn't require an API key.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "a",
            "optional": false,
            "description": "The action to perform"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "CURL example:",
        "content": "    curl -X GET 'https://dogeapi.com/wow/v2/?a=get_difficulty'\n"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "field": "difficulty",
            "optional": false,
            "description": "The current difficulty"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (example):",
          "content": "   HTTP/1.1 200 OK\n   {\"data\":{\"difficulty\":\"1190.35\"}}\n"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "field": "NotLive",
            "optional": false,
            "description": "The v2 API is not available for the specified API key given."
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 400 Bad Request\n   {\"error\":\"v2 is not yet live\"}\n"
        }
      ]
    },
    "filename": "src/index.js"
  },
  {
    "type": "get",
    "url": "/wow/?a=get_difficulty",
    "title": "Get Difficulty",
    "version": "1.0.0",
    "name": "GetDifficulty",
    "group": "DogeCoin",
    "permission": {
      "name": "public",
      "title": "This information is publicly accessible.",
      "description": "No authentication is required.\n"
    },
    "description": "Returns the current difficulty. This doesn't require an API key.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "a",
            "optional": false,
            "description": "The action to perform"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "CURL example:",
        "content": "    curl -X GET 'https://dogeapi.com/wow/?a=get_difficulty'\n"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "int",
            "field": "difficulty",
            "optional": false,
            "description": "The current difficulty"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (example):",
          "content": "   HTTP/1.1 200 OK\n   321.8045805\n"
        }
      ]
    },
    "filename": "src/version1.js"
  },
  {
    "type": "get",
    "url": "/wow/v2/?a=get_info",
    "title": "Get Info",
    "version": "2.0.0",
    "name": "GetInfo",
    "group": "DogeCoin",
    "permission": {
      "name": "public",
      "title": "This information is publicly accessible.",
      "description": "No authentication is required.\n"
    },
    "description": "Returns current information, including price in USD/BTC, block count, difficulty, 5 minute price change, network hashrate, and API version. This doesn't require an API key.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "a",
            "optional": false,
            "description": "The action to perform"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "CURL example:",
        "content": "    curl -X GET 'https://dogeapi.com/wow/v2/?a=get_info'\n"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "field": "info",
            "optional": false,
            "description": "The current information"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "difficulty",
            "optional": false,
            "description": "The current network difficulty"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "network_hashrate",
            "optional": false,
            "description": "The current network hashrate"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "current_block",
            "optional": false,
            "description": "The current block"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "doge_usd",
            "optional": false,
            "description": "The price in USD per 1 Doge."
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "doge_btc",
            "optional": false,
            "description": "The price in USD per 1 Bitcoin."
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "5min_btc_change",
            "optional": false,
            "description": "Fluxuation in Doge/Bitcoin pricing?"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "api_version",
            "optional": false,
            "description": "The current API version"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (example):",
          "content": "   HTTP/1.1 200 OK\n  {\"data\":{\"info\":{\"difficulty\":\"1190.35\",\"network_hashrate\":\"77803335203\",\"current_block\":\"110773\",\"doge_usd\":\"0.00119679\",\"doge_btc\":\"0.00000210\",\"5min_btc_change\":\"0.00000000\",\"5min_usd_change\":\"0.00000000\",\"api_version\":\"2\"}}}\n"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "field": "NotLive",
            "optional": false,
            "description": "The v2 API is not available for the specified API key given."
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 400 Bad Request\n   {\"error\":\"v2 is not yet live\"}\n"
        }
      ]
    },
    "filename": "src/index.js"
  },
  {
    "type": "get",
    "url": "/wow/v2/?api_key={API_KEY}&a=get_my_addresses",
    "title": "Get My Addresses",
    "version": "2.0.0",
    "name": "GetMyAddresses",
    "group": "DogeCoin",
    "permission": {
      "name": "user",
      "title": "Authenticated access is required.",
      "description": "An API key is required.\n"
    },
    "description": "Returns all payment addresses/address_ids for your account.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "api_key",
            "optional": false,
            "description": "The user's api key"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "a",
            "optional": false,
            "description": "The action to perform"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "CURL example:",
        "content": "    curl -X GET 'https://dogeapi.com/wow/?api_key={API_KEY}&a=get_my_addresses'\n"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "field": "addresses",
            "optional": false,
            "description": "The list of addresses on your account."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (example):",
          "content": "   HTTP/1.1 200 OK\n   {\"data\":{\"addresses\":[\"DQ6eccdPZ4n3Hi6orzyD6XZ6XF24ndBFRX\", \"DQrzy5eci6oZ4n9HD6XFRX4dnBZ4ncdPdB\"]}}\n"
        }
      ]
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "field": "InvalidAPIKey",
            "optional": false,
            "description": "The user's API key is either missing or invalid."
          },
          {
            "group": "Unauthorized 401",
            "field": "UnauthorizedShibe",
            "optional": false,
            "description": "The reqesting IP is not allowed to make API calls."
          }
        ],
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "field": "NotLive",
            "optional": false,
            "description": "The v2 API is not available for the specified API key given."
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 401 Unauthorized\n   {\"error\":\"Invalid API Key\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 401 Unauthorized\n   {\"error\":\"Unauthorized Shibe\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 400 Bad Request\n   {\"error\":\"v2 is not yet live\"}\n"
        }
      ]
    },
    "filename": "src/index.js"
  },
  {
    "type": "get",
    "url": "/wow/?api_key={API_KEY}&a=get_my_addresses",
    "title": "Get My Addresses",
    "version": "1.0.0",
    "name": "GetMyAddresses",
    "group": "DogeCoin",
    "permission": {
      "name": "user",
      "title": "Authenticated access is required.",
      "description": "An API key is required.\n"
    },
    "description": "Returns all payment addresses/address_ids for your account.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "api_key",
            "optional": false,
            "description": "The user's api key"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "a",
            "optional": false,
            "description": "The action to perform"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "CURL example:",
        "content": "    curl -X GET 'https://dogeapi.com/wow/?api_key={API_KEY}&a=get_my_addresses'\n"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "field": "addresses",
            "optional": false,
            "description": "The list of addresses on your account."
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (example):",
          "content": "   HTTP/1.1 200 OK\n   [\"DQ6eccdPZ4n3Hi6orzyD6XZ6XF24ndBFRX\", \"DQrzy5eci6oZ4n9HD6XFRX4dnBZ4ncdPdB\"]\n"
        }
      ]
    },
    "error": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "field": "InvalidAPIKey",
            "optional": false,
            "description": "The user's API key is either missing or invalid."
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 200 OK\n   \"Invalid API Key\"\n"
        }
      ]
    },
    "filename": "src/version1.js"
  },
  {
    "type": "get",
    "url": "/wow/v2/?a=get_network_hashrate",
    "title": "Get Network Hashrate",
    "version": "2.0.0",
    "name": "GetNetworkHashrate",
    "group": "DogeCoin",
    "permission": {
      "name": "public",
      "title": "This information is publicly accessible.",
      "description": "No authentication is required.\n"
    },
    "description": "Returns the current network hashrate. This doesn't require an API key.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "a",
            "optional": false,
            "description": "The action to perform"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "CURL example:",
        "content": "    curl -X GET 'https://dogeapi.com/wow/v2/?a=get_network_hashrate'\n"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "field": "network_hashrate",
            "optional": false,
            "description": "The current hashrate of the network"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (example):",
          "content": "   HTTP/1.1 200 OK\n  {\"data\":{\"network_hashrate\":\"77615954075\"}}\n"
        }
      ]
    },
    "error": {
      "fields": {
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "field": "NotLive",
            "optional": false,
            "description": "The v2 API is not available for the specified API key given."
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 400 Bad Request\n   {\"error\":\"v2 is not yet live\"}\n"
        }
      ]
    },
    "filename": "src/index.js"
  },
  {
    "type": "get",
    "url": "/wow/v2/?api_key={API_KEY}&a=get_new_address&address_label={ADDRESS_LABEL}",
    "title": "Get New Address",
    "version": "2.0.0",
    "name": "GetNewAddress",
    "group": "DogeCoin",
    "permission": {
      "name": "user",
      "title": "Authenticated access is required.",
      "description": "An API key is required.\n"
    },
    "description": "Returns a new payment address for your account. You can pass an optional alphanumeric {ADDRESS_LABEL} as a label for the address.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "api_key",
            "optional": false,
            "description": "The user's api key"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "a",
            "optional": false,
            "description": "The action to perform"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "address_label",
            "optional": false,
            "description": "The optional, alphanumerical address label for the wallet"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "CURL example:",
        "content": "    curl -X GET 'https://dogeapi.com/wow/v2/?api_key={API_KEY}&a=get_new_address&address_label={ADDRESS_LABEL}'\n"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "field": "address",
            "optional": false,
            "description": "The address created"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (example):",
          "content": "   HTTP/1.1 200 OK\n   {\"data\":{\"address\":\"DQrzy6eccdPZ4n3Hi6oD6XZ4ndBFRX\"}}\n"
        }
      ]
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "field": "InvalidAPIKey",
            "optional": false,
            "description": "The user's API key is either missing or invalid."
          },
          {
            "group": "Unauthorized 401",
            "field": "UnauthorizedShibe",
            "optional": false,
            "description": "The reqesting IP is not allowed to make API calls."
          }
        ],
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "field": "NotLive",
            "optional": false,
            "description": "The v2 API is not available for the specified API key given."
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 401 Unauthorized\n   {\"error\":\"Invalid API Key\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 401 Unauthorized\n   {\"error\":\"Unauthorized Shibe\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 400 Bad Request\n   {\"error\":\"v2 is not yet live\"}\n"
        }
      ]
    },
    "filename": "src/index.js"
  },
  {
    "type": "get",
    "url": "/wow/?api_key={API_KEY}&a=get_new_address&address_label={ADDRESS_LABEL}",
    "title": "Get New Address",
    "version": "1.0.0",
    "name": "GetNewAddress",
    "group": "DogeCoin",
    "permission": {
      "name": "user",
      "title": "Authenticated access is required.",
      "description": "An API key is required.\n"
    },
    "description": "Returns a new payment address for your account. You can pass an optional alphanumeric {ADDRESS_LABEL} as a label for the address.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "api_key",
            "optional": false,
            "description": "The user's api key"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "a",
            "optional": false,
            "description": "The action to perform"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "address_label",
            "optional": false,
            "description": "The optional, alphanumerical address label for the wallet"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "CURL example:",
        "content": "    curl -X GET 'https://dogeapi.com/wow/?api_key={API_KEY}&a=get_new_address&address_label={ADDRESS_LABEL}'\n"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "field": "address",
            "optional": false,
            "description": "The address created"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (example):",
          "content": "   HTTP/1.1 200 OK\n   \"DQrzy6eccdPZ4n3Hi6oD6XZ4ndBFRX\"\n"
        }
      ]
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "field": "InvalidAPIKey",
            "optional": false,
            "description": "The user's API key is either missing or invalid."
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 401 Unauthorized\n   \"Invalid API Key\"\n"
        }
      ]
    },
    "filename": "src/version1.js"
  },
  {
    "type": "get",
    "url": "/wow/v2/?api_key={API_KEY}&a=get_transactions&num={NUMBER}&type={TYPE}&user_id={USER_ID}&payment_address={PAYMENT_ADDRESS}&label={LABEL}",
    "title": "Get Transactions",
    "version": "2.0.0",
    "name": "GetTransactions",
    "group": "DogeCoin",
    "permission": {
      "name": "user",
      "title": "Authenticated access is required.",
      "description": "An API key is required.\n"
    },
    "description": "Returns a list of users asssociated with your account with their balances.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "api_key",
            "optional": false,
            "description": "The user's api key"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "a",
            "optional": false,
            "description": "The action to perform"
          },
          {
            "group": "Parameter",
            "type": "int",
            "field": "num",
            "optional": false,
            "description": "The number of transactions"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "type",
            "optional": false,
            "description": "The type of transaction. This can be \"receive\", \"send\", \"move\", or \"fee\""
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "user_id",
            "optional": false,
            "description": "(Optional) The user identification (lowercased)"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "payment_address",
            "optional": false,
            "description": "(Optional) A Doge address"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "label",
            "optional": false,
            "description": "(Optional) A label for one of the Doge addresses on the account"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "CURL example:",
        "content": "    curl -X GET 'https://dogeapi.com/wow/v2/?api_key={API_KEY}&a=get_transactions&num={NUMBER}&type={TYPE}&user_id={USER_ID}'\n"
      },
      {
        "title": "CURL example:",
        "content": "    curl -X GET 'https://dogeapi.com/wow/v2/?api_key={API_KEY}&a=get_transactions&num={NUMBER}&type={TYPE}&payment_address={PAYMENT_ADDRESS}'\n"
      },
      {
        "title": "CURL example:",
        "content": "    curl -X GET 'https://dogeapi.com/wow/v2/?api_key={API_KEY}&a=get_transactions&num={NUMBER}&type={TYPE}&label={LABEL}'\n"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "field": "transactions",
            "optional": false,
            "description": "The list of transactions"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "txid",
            "optional": false,
            "description": "The transaction id"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "amount",
            "optional": false,
            "description": "The amount in the transaction"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "transaction_label",
            "optional": false,
            "description": "The label for the transaction"
          },
          {
            "group": "Success 200",
            "type": "int",
            "field": "transaction_time",
            "optional": false,
            "description": "The epoch time of the transaction"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "address",
            "optional": false,
            "description": "The doge address that participated in the transaction"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "transaction_type",
            "optional": false,
            "description": "The type of transaction"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (example):",
          "content": "   HTTP/1.1 200 OK\n   {\"data\":{\"transactions\":[{\"txid\":\"309eb1b0e78aa194662f08cff24927c3\",\"amount\":\"5.97000000\",\"transaction_label\":\"TestTransaction\",\"transaction_time\":1392834438,\"address\":\"DQyYRYPKL1Gsp1SEkhPsywzz1GHP9v3XGj\",\"transaction_type\":\"wallet\"}]}}\n"
        }
      ]
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "field": "InvalidAPIKey",
            "optional": false,
            "description": "The user's API key is either missing or invalid."
          },
          {
            "group": "Unauthorized 401",
            "field": "UnauthorizedShibe",
            "optional": false,
            "description": "The user's pin was invalid"
          }
        ],
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "field": "NumRequired",
            "optional": false,
            "description": "The num parameter was missing."
          },
          {
            "group": "Bad Request 400",
            "field": "TypeRequired",
            "optional": false,
            "description": "The type of transaction parameter was missing."
          },
          {
            "group": "Bad Request 400",
            "field": "NotLive",
            "optional": false,
            "description": "The v2 API is not available for the specified API key given."
          }
        ],
        "Not Found 404": [
          {
            "group": "Not Found 404",
            "field": "InvalidType",
            "optional": false,
            "description": "The type of transaction parameter was invalid. Should be \"receive\", \"send\", \"move\", or \"fee\"."
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 401 Unauthorized\n   {\"error\":\"Invalid API Key\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 401 Unauthorized\n   {\"error\":\"Unauthorized Shibe\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 400 Bad Request\n   {\"error\":\"num Required\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 400 Bad Request\n   {\"error\":\"type Required\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 404 Not Found\n   {\"error\":\"Transaction type is invalid\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 400 Bad Request\n   {\"error\":\"v2 is not yet live\"}\n"
        }
      ]
    },
    "filename": "src/index.js"
  },
  {
    "type": "get",
    "url": "/wow/v2/?api_key={API_KEY}&a=get_user_address&user_id={USER_ID}",
    "title": "Get User Address",
    "version": "2.0.0",
    "name": "GetUserAddress",
    "group": "DogeCoin",
    "permission": {
      "name": "user",
      "title": "Authenticated access is required.",
      "description": "An API key is required.\n"
    },
    "description": "Returns the payment address assigned to the user with a given {USER_ID}",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "api_key",
            "optional": false,
            "description": "The user's api key"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "a",
            "optional": false,
            "description": "The action to perform"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "user_id",
            "optional": false,
            "description": "User identification (lowercased)"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "CURL example:",
        "content": "    curl -X GET 'https://dogeapi.com/wow/v2/?api_key={API_KEY}&a=get_user_address&user_id={USER_ID}'\n"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "field": "address",
            "optional": false,
            "description": "The Doge address of the user"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (example):",
          "content": "   HTTP/1.1 200 OK\n   {\"data\":{\"address\":\"DQPKwzz1GHPXGj9L1GlhPsyvyYRY7sp1SE\"}}\n"
        }
      ]
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "field": "InvalidAPIKey",
            "optional": false,
            "description": "The user's API key is either missing or invalid."
          },
          {
            "group": "Unauthorized 401",
            "field": "UnauthorizedShibe",
            "optional": false,
            "description": "The reqesting IP is not allowed to make API calls."
          }
        ],
        "Not Found 404": [
          {
            "group": "Not Found 404",
            "field": "AddressNotFound",
            "optional": false,
            "description": "The user id was not found on the account."
          }
        ],
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "field": "NotLive",
            "optional": false,
            "description": "The v2 API is not available for the specified API key given."
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 401 Unauthorized\n   {\"error\":\"Invalid API Key\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 401 Unauthorized\n   {\"error\":\"Unauthorized Shibe\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 404 Not Found\n   {\"error\":\"Address Not Found\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 400 Bad Request\n   {\"error\":\"v2 is not yet live\"}\n"
        }
      ]
    },
    "filename": "src/index.js"
  },
  {
    "type": "get",
    "url": "/wow/v2/?api_key={API_KEY}&a=get_user_balance&user_id={USER_ID}",
    "title": "Get User Balance",
    "version": "2.0.0",
    "name": "GetUserBalance",
    "group": "DogeCoin",
    "permission": {
      "name": "user",
      "title": "Authenticated access is required.",
      "description": "An API key is required.\n"
    },
    "description": "Returns the payment address assigned to the user with a given {USER_ID}",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "api_key",
            "optional": false,
            "description": "The user's api key"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "a",
            "optional": false,
            "description": "The action to perform"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "user_id",
            "optional": false,
            "description": "User identification (lowercased)"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "CURL example:",
        "content": "    curl -X GET 'https://dogeapi.com/wow/v2/?api_key={API_KEY}&a=get_user_balance&user_id={USER_ID}'\n"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "field": "balance",
            "optional": false,
            "description": "The Doge amount of the user"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (example):",
          "content": "   HTTP/1.1 200 OK\n   {\"data\":{\"balance\":\"0.00000000\"}}\n"
        }
      ]
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "field": "InvalidAPIKey",
            "optional": false,
            "description": "The user's API key is either missing or invalid."
          },
          {
            "group": "Unauthorized 401",
            "field": "UnauthorizedShibe",
            "optional": false,
            "description": "The reqesting IP is not allowed to make API calls."
          }
        ],
        "Not Found 404": [
          {
            "group": "Not Found 404",
            "field": "UserNotFound",
            "optional": false,
            "description": "The user id was not found on the account."
          }
        ],
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "field": "NotLive",
            "optional": false,
            "description": "The v2 API is not available for the specified API key given."
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 401 Unauthorized\n   {\"error\":\"Invalid API Key\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 401 Unauthorized\n   {\"error\":\"Unauthorized Shibe\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 404 Not Found\n   {\"error\":\"User Not Found\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 400 Bad Request\n   {\"error\":\"v2 is not yet live\"}\n"
        }
      ]
    },
    "filename": "src/index.js"
  },
  {
    "type": "get",
    "url": "/wow/v2/?api_key={API_KEY}&a=get_users",
    "title": "Get Users",
    "version": "2.0.0",
    "name": "GetUsers",
    "group": "DogeCoin",
    "permission": {
      "name": "user",
      "title": "Authenticated access is required.",
      "description": "An API key is required.\n"
    },
    "description": "Returns a list of users asssociated with your account with their balances.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "api_key",
            "optional": false,
            "description": "The user's api key"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "a",
            "optional": false,
            "description": "The action to perform"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "CURL example:",
        "content": "    curl -X GET 'https://dogeapi.com/wow/v2/?api_key={API_KEY}&a=get_users'\n"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "field": "users",
            "optional": false,
            "description": "The list of users"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "user_id",
            "optional": false,
            "description": "The user identification (lowercased)"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "payment_address",
            "optional": false,
            "description": "The user's Doge address."
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "user_balance",
            "optional": false,
            "description": "The user's Doge amount in their address"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (example):",
          "content": "   HTTP/1.1 200 OK\n   {\"data\":{\"users\":[{\"user_id\":\"testuser\",\"payment_address\":\"DQRYSEkhPsywzz1v3XGjGLPKLyY1Gsp1P9\",\"user_balance\":\"0.00000000\"},{\"user_id\":\"1\",\"payment_address\":\"DGFDjNRaaDQd9Vh7iDQ1MseRuL3tCta2LN\",\"user_balance\":\"0.00000000\"}]}}\n"
        }
      ]
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "field": "InvalidAPIKey",
            "optional": false,
            "description": "The user's API key is either missing or invalid."
          },
          {
            "group": "Unauthorized 401",
            "field": "UnauthorizedShibe",
            "optional": false,
            "description": "The user's pin was invalid"
          }
        ],
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "field": "NotLive",
            "optional": false,
            "description": "The v2 API is not available for the specified API key given."
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 401 Unauthorized\n   {\"error\":\"Invalid API Key\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 401 Unauthorized\n   {\"error\":\"Unauthorized Shibe\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 400 Bad Request\n   {\"error\":\"v2 is not yet live\"}\n"
        }
      ]
    },
    "filename": "src/index.js"
  },
  {
    "type": "get",
    "url": "/wow/v2/?api_key={API_KEY}&a=move_to_user&to_user_id={TO_USER_ID}&from_user_id={FROM_USER_ID}&amount_doge={AMOUNT_DOGE}",
    "title": "Move From User",
    "version": "2.0.0",
    "name": "MoveToUser",
    "group": "DogeCoin",
    "permission": {
      "name": "user",
      "title": "Authenticated access is required.",
      "description": "An API key is required.\n"
    },
    "description": "Moves {AMOUNT_DOGE} to user with ID {TO_USER_ID} from user with ID {FROM_USER_ID}. There is no network fee for this transaction, just the DogeAPI 0.5% fee.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "api_key",
            "optional": false,
            "description": "The user's api key"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "a",
            "optional": false,
            "description": "The action to perform"
          },
          {
            "group": "Parameter",
            "type": "int",
            "field": "amount_doge",
            "optional": false,
            "description": "The amount to withdraw"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "to_user_id",
            "optional": false,
            "description": "User identification of the receiver (lowercased)"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "from_user_id",
            "optional": false,
            "description": "User identification of the sender (lowercased)"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "CURL example:",
        "content": "    curl -X GET 'https://dogeapi.com/wow/v2/?api_key={API_KEY}&a=move_to_user&to_user_id={TO_USER_ID}&from_user_id={FROM_USER_ID}&amount_doge={AMOUNT_DOGE}'\n"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Double",
            "field": "fee",
            "optional": false,
            "description": "The fee for the transaction"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (example):",
          "content": "   HTTP/1.1 200 OK\n   {\"data\":{\"success\":{\"fee\":0.05}}}\n"
        }
      ]
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "field": "InvalidAPIKey",
            "optional": false,
            "description": "The user's API key is either missing or invalid."
          },
          {
            "group": "Unauthorized 401",
            "field": "UnauthorizedShibe",
            "optional": false,
            "description": "The user's pin was invalid"
          }
        ],
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "field": "NotEnoughDoge",
            "optional": false,
            "description": "The user does not have enough Doge in their account."
          },
          {
            "group": "Bad Request 400",
            "field": "AmountDogeRequired",
            "optional": false,
            "description": "The amount of doge is missing from the request."
          },
          {
            "group": "Bad Request 400",
            "field": "AtLeast5Doge",
            "optional": false,
            "description": "The amount of doge withdrawing is lower than allowed amount."
          },
          {
            "group": "Bad Request 400",
            "field": "NotLive",
            "optional": false,
            "description": "The v2 API is not available for the specified API key given."
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 401 Unauthorized\n   {\"error\":\"Invalid API Key\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 401 Unauthorized\n   {\"error\":\"Unauthorized Shibe\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 400 Bad Request\n   {\"error\":\"Not Enough Doge\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 400 Bad Request\n   {\"error\":\"amount_doge required\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 400 Bad Request\n   {\"error\":\"Must Withdraw At Least 5 Doge\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 400 Bad Request\n   {\"error\":\"v2 is not yet live\"}\n"
        }
      ]
    },
    "filename": "src/index.js"
  },
  {
    "type": "get",
    "url": "/wow/v2?api_key={API_KEY}&a=withdraw&amount_doge={AMOUNT}&pin={PIN}&payment_address={PAYMENT_ADDRESS}",
    "title": "Withdraw",
    "version": "2.0.0",
    "name": "Withdraw",
    "group": "DogeCoin",
    "permission": {
      "name": "user",
      "title": "Authenticated access is required.",
      "description": "An API key is required.\n"
    },
    "description": "Withdraws {AMOUNT} doge to a {PAYMENT_ADDRESS} you specify. Requires your {PIN}. For now this must be more than 5 doge, and you must have enough extra in your wallet to pay all network fees (another 1-3 doge). DogeAPI takes a 0.5% fee when withdrawing.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "api_key",
            "optional": false,
            "description": "The user's api key"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "a",
            "optional": false,
            "description": "The action to perform"
          },
          {
            "group": "Parameter",
            "type": "int",
            "field": "amount_doge",
            "optional": false,
            "description": "The amount to withdraw"
          },
          {
            "group": "Parameter",
            "type": "int",
            "field": "pin",
            "optional": false,
            "description": "Your account pin number"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "payment_address",
            "optional": false,
            "description": "The account to withdraw to"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "CURL example:",
        "content": "    curl -X GET 'https://dogeapi.com/wow/v2/?api_key={API_KEY}&a=withdraw&amount_doge={AMOUNT}&pin={PIN}&payment_address={PAYMENT_ADDRESS}'\n"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "field": "transaction",
            "optional": false,
            "description": "The unique transaction id on the market"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (example):",
          "content": "   HTTP/1.1 200 OK\n   {\"data\":{\"txid\": \"52c5a2923b113ef07c47b077ba8bf3a03381c687f218f6b326773892565d6963\"}}\n"
        }
      ]
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "field": "InvalidAPIKey",
            "optional": false,
            "description": "The user's API key is either missing or invalid."
          },
          {
            "group": "Unauthorized 401",
            "field": "UnauthorizedShibe",
            "optional": false,
            "description": "The user's pin was invalid"
          }
        ],
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "field": "NotEnoughDoge",
            "optional": false,
            "description": "The user does not have enough Doge in their account."
          },
          {
            "group": "Bad Request 400",
            "field": "AmountDogeRequired",
            "optional": false,
            "description": "The amount of doge is missing from the request."
          },
          {
            "group": "Bad Request 400",
            "field": "AtLeast5Doge",
            "optional": false,
            "description": "The amount of doge withdrawing is lower than allowed amount."
          },
          {
            "group": "Bad Request 400",
            "field": "NotLive",
            "optional": false,
            "description": "The v2 API is not available for the specified API key given."
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 401 Unauthorized\n   {\"error\":\"Invalid API Key\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 401 Unauthorized\n   {\"error\":\"Unauthorized Shibe\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 400 Bad Request\n   {\"error\":\"Not Enough Doge\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 400 Bad Request\n   {\"error\":\"amount_doge required\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 400 Bad Request\n   {\"error\":\"Must Withdraw At Least 5 Doge\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 400 Bad Request\n   {\"error\":\"v2 is not yet live\"}\n"
        }
      ]
    },
    "filename": "src/index.js"
  },
  {
    "type": "get",
    "url": "/wow/?api_key={API_KEY}&a=withdraw&amount={AMOUNT}&payment_address={PAYMENT_ADDRESS}",
    "title": "Withdraw",
    "version": "1.0.0",
    "name": "Withdraw",
    "group": "DogeCoin",
    "permission": {
      "name": "user",
      "title": "Authenticated access is required.",
      "description": "An API key is required.\n"
    },
    "description": "Withdraws {AMOUNT} doge to a {PAYMENT_ADDRESS} you specify.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "api_key",
            "optional": false,
            "description": "The user's api key"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "a",
            "optional": false,
            "description": "The action to perform"
          },
          {
            "group": "Parameter",
            "type": "int",
            "field": "amount",
            "optional": false,
            "description": "The amount to withdraw"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "payment_address",
            "optional": false,
            "description": "The account to withdraw to"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "CURL example:",
        "content": "    curl -X GET 'https://dogeapi.com/wow/?api_key={API_KEY}&a=withdraw&amount={AMOUNT}&payment_address={PAYMENT_ADDRESS}'\n"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "field": "transaction",
            "optional": false,
            "description": "The unique transaction id on the market"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (example):",
          "content": "   HTTP/1.1 200 OK\n   \"52c5a2923b113ef07c47b077ba8bf3a03381c687f218f6b326773892565d6963\"\n"
        }
      ]
    },
    "error": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "field": "InvalidAPIKey",
            "optional": false,
            "description": "The user's API key is either missing or invalid."
          },
          {
            "group": "Success 200",
            "field": "NotEnoughDoge",
            "optional": false,
            "description": "The user does not have enough Doge in their account."
          },
          {
            "group": "Success 200",
            "field": "BadQuery",
            "optional": false,
            "description": "The query was invalid, probably indicated a missing parameter"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 200 OK\n   \"Invalid API Key\"\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 200 OK\n   \"Not enough Doge\"\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 200 OK\n   \"Bad Query\"\n"
        }
      ]
    },
    "filename": "src/version1.js"
  },
  {
    "type": "get",
    "url": "/wow/v2/?api_key={API_KEY}&a=withdraw_from_user&user_id={USER_ID}&pin={PIN}&amount_doge={AMOUNT_DOGE}&payment_address={PAYMENT_ADDRESS}",
    "title": "Withdraw From User",
    "version": "2.0.0",
    "name": "WithdrawFromUser",
    "group": "DogeCoin",
    "permission": {
      "name": "user",
      "title": "Authenticated access is required.",
      "description": "An API key is required.\n"
    },
    "description": "Withdraws {AMOUNT_DOGE} from {USER_ID} to {PAYMENT_ADDRESS}. Requires your {PIN}. For now this must be more than 5 doge, and you must have enough extra in your wallet to pay all network fees (another 1-3 doge). DogeAPI takes a 0.5% fee when withdrawing.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "api_key",
            "optional": false,
            "description": "The user's api key"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "a",
            "optional": false,
            "description": "The action to perform"
          },
          {
            "group": "Parameter",
            "type": "int",
            "field": "amount_doge",
            "optional": false,
            "description": "The amount to withdraw"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "user_id",
            "optional": false,
            "description": "User identification (lowercased)"
          },
          {
            "group": "Parameter",
            "type": "int",
            "field": "pin",
            "optional": false,
            "description": "Your account pin number"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "payment_address",
            "optional": false,
            "description": "The account to withdraw to"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "CURL example:",
        "content": "    curl -X GET 'https://dogeapi.com/wow/v2/?api_key={API_KEY}&a=withdraw_from_user&user_id={USER_ID}&pin={PIN}&amount_doge={AMOUNT_DOGE}&payment_address={PAYMENT_ADDRESS}'\n"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "field": "transaction",
            "optional": false,
            "description": "The unique transaction id on the market"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response (example):",
          "content": "   HTTP/1.1 200 OK\n   {\"data\":{\"txid\": \"52c5a2923b113ef07c47b077ba8bf3a03381c687f218f6b326773892565d6963\"}}\n"
        }
      ]
    },
    "error": {
      "fields": {
        "Unauthorized 401": [
          {
            "group": "Unauthorized 401",
            "field": "InvalidAPIKey",
            "optional": false,
            "description": "The user's API key is either missing or invalid."
          },
          {
            "group": "Unauthorized 401",
            "field": "UnauthorizedShibe",
            "optional": false,
            "description": "The user's pin was invalid"
          }
        ],
        "Bad Request 400": [
          {
            "group": "Bad Request 400",
            "field": "NotEnoughDoge",
            "optional": false,
            "description": "The user does not have enough Doge in their account."
          },
          {
            "group": "Bad Request 400",
            "field": "AmountDogeRequired",
            "optional": false,
            "description": "The amount of doge is missing from the request."
          },
          {
            "group": "Bad Request 400",
            "field": "AtLeast5Doge",
            "optional": false,
            "description": "The amount of doge withdrawing is lower than allowed amount."
          },
          {
            "group": "Bad Request 400",
            "field": "NotLive",
            "optional": false,
            "description": "The v2 API is not available for the specified API key given."
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 401 Unauthorized\n   {\"error\":\"Invalid API Key\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 401 Unauthorized\n   {\"error\":\"Unauthorized Shibe\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 400 Bad Request\n   {\"error\":\"Not Enough Doge\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 400 Bad Request\n   {\"error\":\"amount_doge required\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 400 Bad Request\n   {\"error\":\"Must Withdraw At Least 5 Doge\"}\n"
        },
        {
          "title": "Error-Response (example):",
          "content": "   HTTP/1.1 400 Bad Request\n   {\"error\":\"v2 is not yet live\"}\n"
        }
      ]
    },
    "filename": "src/index.js"
  },
  {
    "version": "2.0.0",
    "group": "index.js",
    "type": "",
    "url": "",
    "filename": "src/index.js"
  },
  {
    "version": "2.0.0",
    "group": "index.js",
    "type": "",
    "url": "",
    "filename": "src/index.js"
  },
  {
    "version": "1.0.0",
    "group": "version1.js",
    "type": "",
    "url": "",
    "filename": "src/version1.js"
  },
  {
    "version": "1.0.0",
    "group": "version1.js",
    "type": "",
    "url": "",
    "filename": "src/version1.js"
  }
] });