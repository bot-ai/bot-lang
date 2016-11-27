"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _clean = require("./clean");

var _clean2 = _interopRequireDefault(_clean);

var _replace = require("./replace");

var _replace2 = _interopRequireDefault(_replace);

var _tag = require("./tag");

var _tag2 = _interopRequireDefault(_tag);

var _util = require("./util");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { clean: _clean2.default, replace: _replace2.default, tag: _tag2.default, util: _util2.default };