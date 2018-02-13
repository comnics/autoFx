// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.get('/getBalance', function(req, res) {




    res.json({ message: 'Balance' });
});

router.get('/limit_buy/:access_token/:secret_key', function(req, res) {
    var access_token = req.params.access_token;
    var secret_key = req.params.secret_key;

    var crypto = require('crypto');
    var request = require('request');
    var ACCESS_TOKEN = access_token;
    var SECRET_KEY = secret_key;

    var url = 'https://api.coinone.co.kr/v2/order/limit_buy/';
    var payload = {
        "access_token": ACCESS_TOKEN,
        "price": 500000,
        "qty": 0.1,
        "currency": "btc",
        "nonce": Date.now()
    };

    payload = new Buffer(JSON.stringify(payload)).toString('base64');

    var signature = crypto
        .createHmac("sha512", SECRET_KEY.toUpperCase())
        .update(payload)
        .digest('hex');

    var headers = {
        'content-type':'application/json',
        'X-COINONE-PAYLOAD': payload,
        'X-COINONE-SIGNATURE': signature
    };

    var options = {
        url: url,
        headers: headers,
        body: payload
    };

    request.post(options,
        function(error, response, body) {
            console.log(body);
            res.json(body);
        });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
