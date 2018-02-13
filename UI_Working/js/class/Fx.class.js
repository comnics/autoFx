/**
 *
 *
 * @constructor
 */

// define the FxBasic Class
function FxBasic() {};

FxBasic.prototype.configure = function(){console.log("configure");};
FxBasic.prototype.getPrice = function(){console.log("getPrice");};
FxBasic.prototype.getBalance = function(){console.log("getBalance");};
FxBasic.prototype.sendTrasaction = function(){console.log("sendTrasaction");};

// define the Coinone class
function Coinone() {
    Coinone.CURRENT_CURRENCY = {
        "BTC" : -1,
        "ETH" : -1
    };

    // Call the parent constructor
    FxBasic.call(this);
};

// inherit FxBasic
Coinone.prototype = new FxBasic();
Coinone.prototype.getPrice = function(currency="btc"){
    $.ajax({
        url: "https://api.coinone.co.kr/ticker/?currency=" + currency,
        dataType: "json"
    }).done(function(res) {
//        console.log(res);
        price = res.last;
        //console.log(price);
        //$(dom_id).html(Intl.NumberFormat().format(price) + " KRW");
        Coinone.CURRENT_CURRENCY["BTC"] = price;
    });
};

Coinone.prototype.getPriceAndDisplay = function(currency="btc", dom="#BTCCurrentPrice"){
    $.ajax({
        url: "https://api.coinone.co.kr/ticker/?currency=" + currency,
        dataType: "json"
    }).done(function(res) {
        price = res.last;

        console.log(price);

        if(Coinone.CURRENT_CURRENCY["BTC"] != price){
            Coinone.CURRENT_CURRENCY["BTC"] = price;
            $(dom).html(number_format(price) + " KRW");
        }
    });
};

Coinone.prototype.getBalance = function(accessToken){
    $.ajax({
        url: "https://api.coinone.co.kr/v1/account/balance/?access_token=" + accessToken,
        dataType: "json"
    }).done(function(res) {

        console.log(res);

    });

}