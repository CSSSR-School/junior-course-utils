"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _deepDiff = _interopRequireDefault(require("deep-diff"));

var _performanceNow = _interopRequireDefault(require("performance-now"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var dictionary = {
  E: {
    color: '#2196F3',
    text: 'CHANGED:'
  },
  N: {
    color: '#4CAF50',
    text: 'ADDED:'
  },
  D: {
    color: '#F44336',
    text: 'DELETED:'
  },
  A: {
    color: '#2196F3',
    text: 'ARRAY:'
  }
},
    style = function style(kind) {
  return "color: ".concat(dictionary[kind].color, "; font-weight: bold");
},
    render = function render(diff) {
  var kind = diff.kind,
      _diff$path = diff.path,
      path = _diff$path === void 0 ? [] : _diff$path,
      lhs = diff.lhs,
      rhs = diff.rhs,
      index = diff.index,
      item = diff.item;

  switch (kind) {
    case 'E':
      return "".concat(path.join('.'), " ").concat(lhs, " \u2192 ").concat(rhs);

    case 'N':
      return "".concat(path.join('.'), " ").concat(rhs);

    case 'D':
      return "".concat(path.join('.'));

    case 'A':
      return "".concat(path.join('.'), "[").concat(index, "]"), item;

    default:
      return null;
  }
},
    renderDiff = function renderDiff(elem) {
  var kind = elem.kind,
      output = render(elem);
  console.debug("%c ".concat(dictionary[kind].text), style(kind), output);
},
    logDiff = function logDiff(key) {
  return function (diff) {
    if (diff) {
      console.debug("\u2014\u2014 ".concat(key, " diff \u2014\u2014"));
      diff.forEach(renderDiff);
    } else {
      console.debug("\u2014\u2014 no ".concat(key, " diff \u2014\u2014"));
    }
  };
},
    logPropsDiff = logDiff('props'),
    logStateDiff = logDiff('state'),
    enabled = function enabled() {
  return (typeof localStorage === "undefined" ? "undefined" : _typeof(localStorage)) != undefined && localStorage.debug !== 'false';
};

function logger(groupName, nextProps, nextState) {
  if (enabled(groupName)) {
    var startTime = (0, _performanceNow.default)(),
        time = new Date(),
        propsDiff = (0, _deepDiff.default)(this.props, nextProps),
        stateDiff = (0, _deepDiff.default)(this.state, nextState),
        groupTitle = "".concat(groupName, " @").concat(time.getHours(), ":").concat(time.getMinutes(), ":").concat(time.getSeconds());
    console.groupCollapsed(groupTitle);
    logPropsDiff(propsDiff);
    logStateDiff(stateDiff);
    console.debug("\u2192 logger took ".concat(((0, _performanceNow.default)() - startTime).toFixed(3), "ms"));
    console.groupEnd(groupName);
  }
}

var _default = logger;
exports.default = _default;