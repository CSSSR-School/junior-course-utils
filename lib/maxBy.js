"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(getter, list) {
  return list.reduce(function (acc, item) {
    return getter(acc) < getter(item) ? item : acc;
  });
};

exports.default = _default;