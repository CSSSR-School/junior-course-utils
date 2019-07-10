"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(value) {
  var integer = (value || '').replace(/\D/g, '');
  return integer.length ? parseInt(integer, 10) : 0;
};

exports.default = _default;