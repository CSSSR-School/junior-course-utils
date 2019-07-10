"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = splitEvery;

function splitEvery(n, list) {
  if (n <= 0) {
    throw new Error('First argument to splitEvery must be a positive integer');
  }

  var result = [];
  var idx = 0;

  while (idx < list.length) {
    result.push(Array.prototype.slice.call(list, idx, idx += n));
  }

  return result;
}

;