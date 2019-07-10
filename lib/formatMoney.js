"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function formatMoney(amount) {
  var decimalCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var decimal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ".";
  var thousands = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ",";
  decimalCount = Math.abs(decimalCount);
  decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
  var negativeSign = amount < 0 ? "-" : "";
  var i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
  var j = i.length > 3 ? i.length % 3 : 0;
  return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
}

;
var _default = formatMoney;
exports.default = _default;