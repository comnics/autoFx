/**


 */
var isStartFx = false;
var g_api_key;
var g_secret_key;
var g_fx_buy_per;
var g_fx_sell_per;
var g_fx_buy_price;
var g_fx_sell_price;
var g_fx_coin;
var g_fx_start_price;

var coinone = new Coinone();

$(document).ready(function(){
    var cnt = 0;


    coinone.getBalance("36c46133-5da2-46b3-8ba4-23f1a0ec0eae");


    coinone.getPriceAndDisplay("btc", "#BTCCurrentPrice");

    //setInterval(function(){  startMonitoring(); }, 1000);

    $('#btnFxStartStop').click(function(){

        g_fx_coin = $('#inFxCoin').val();
        g_fx_start_price = Coinone.CURRENT_CURRENCY[g_fx_coin]

        if(!confirm("현재가 " + number_format(g_fx_start_price) + "원에서 시작하시겠습니까?")){
            return false;
        }
        isStartFx = !isStartFx;

        if(isStartFx) {
            startFx();
            $(this).html("Fx Stop");
        }else{
            stopFx();
            $(this).html("Fx Start");
        }

    });

});

var currentPrice = {'BTC' : -1};

function startMonitoring(){
    if(isStartFx) {
        coinone.getPriceAndDisplay("btc", "#BTCCurrentPrice");
        if (Coinone.CURRENT_CURRENCY['BTC'] > 0 && currentPrice['BTC'] != Coinone.CURRENT_CURRENCY['BTC']) {
            currentPrice['BTC'] = Coinone.CURRENT_CURRENCY['BTC'];
            $('#fxConsole').html(new Date().format("[HH:mm:ss]") + ": [BTC]현재가 : " + Intl.NumberFormat().format(Coinone.CURRENT_CURRENCY['BTC']) + "원<br />" + $('#fxConsole').html());
        }
    }
}

function startFx(){
    //입력값 저장
    g_api_key = $('#inApiKey').val();
    g_secret_key = $('#inSecretKey').val();
    g_fx_buy_per = parseInt($('#inFxBuy').val());
    g_fx_sell_per = parseInt($('#inFxSell').val());

    //현재가가 초기화 되지 않았다면 종료.
    if(Coinone.CURRENT_CURRENCY[g_fx_coin] == undefined || Coinone.CURRENT_CURRENCY[g_fx_coin] < 0){
        alert('초기화 실패[err_code:000]');
        return false;
    }


    if(g_fx_buy_per > 0)
        g_fx_buy_price = parseInt(g_fx_start_price) + parseInt(g_fx_start_price/(100-g_fx_buy_per));
    else if(g_fx_buy_per < 0)
        g_fx_buy_price = parseInt(g_fx_start_price) - parseInt(g_fx_start_price/(100-(g_fx_buy_per*-1)));
    else
        g_fx_buy_price = g_fx_start_price;

    //g_fx_buy_price = g_fx_start_price - (g_fx_start_price/(100-g_fx_buy_per));
    g_fx_sell_price = g_fx_buy_price + (g_fx_buy_price/g_fx_sell_per);

    //configure 설정 및 display
    var strConfigureInfo =
            "Fx 시작가 : " + number_format(g_fx_start_price) + "원<br/>" +
            "매입가 : " + g_fx_buy_per + "%이하(" + number_format(g_fx_buy_price) + "원 이하)<br/>" +
            "매도가 : " + g_fx_sell_per + "%이상(" + number_format(g_fx_sell_price) + "원 이상)"
        ;
    $('#fxConfigureInfo').html(strConfigureInfo);

    setInterval(function(){  startMonitoring(); }, 1000);

}

function stopFx(){
    $('#fxConfigureInfo').html("STOP!!!");
}