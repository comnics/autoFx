var dummyConsole = [];
var console = console || {};
if (!console.log) {
	console.log = function(message) {
		dummyConsole.push(message);
	}
}

function number_format(num, decimals, dec_point, thousands_sep) {
	num = parseFloat(num);
	if(isNaN(num)) return '0';

	if(typeof(decimals) == 'undefined') decimals = 0;
	if(typeof(dec_point) == 'undefined') dec_point = '.';
	if(typeof(thousands_sep) == 'undefined') thousands_sep = ',';
	decimals = Math.pow(10, decimals);

	num = num * decimals;
	num = Math.round(num);
	num = num / decimals;

	num = String(num);
	var reg = /(^[+-]?\d+)(\d{3})/;
	var tmp = num.split('.');
	var n = tmp[0];
	var d = tmp[1] ? dec_point + tmp[1] : '';

	while(reg.test(n)) n = n.replace(reg, "$1"+thousands_sep+"$2");

	return n + d;
}

Date.prototype.format = function(f) {
	if (!this.valueOf()) return " ";

	var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
	var d = this;

	return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
		switch ($1) {
			case "yyyy": return d.getFullYear();
			case "yy": return (d.getFullYear() % 1000).zf(2);
			case "MM": return (d.getMonth() + 1).zf(2);
			case "dd": return d.getDate().zf(2);
			case "E": return weekName[d.getDay()];
			case "HH": return d.getHours().zf(2);
			case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
			case "mm": return d.getMinutes().zf(2);
			case "ss": return d.getSeconds().zf(2);
			case "a/p": return d.getHours() < 12 ? "오전" : "오후";
			default: return $1;
		}
	});
};

String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};
