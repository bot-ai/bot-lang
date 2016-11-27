"use strict";

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _util = require("./util");

var _util2 = _interopRequireDefault(_util);

var _clean = require("./clean");

var _clean2 = _interopRequireDefault(_clean);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.contraction = function (input) {
  _util2.default.prepFile("replace/contractions.txt");
  return testRegexpArray(input);
};

exports.spellfix = function (input) {
  _util2.default.prepFile("replace/spellfix.txt");
  return testRegexpArray(input);
};

exports.substitutes = function (input) {
  _util2.default.prepFile("replace/substitutes.txt");
  return testRegexpArray(input);
};

exports.frivolous = function (input) {
  _util2.default.prepFile("replace/frivolous.txt");
  return testRegexpArray(input);
};

exports.british = function (input) {
  _util2.default.prepFile("replace/british.txt");
  return testRegexpArray(input);
};

exports.emoji = function (input) {
  _util2.default.prepFile("replace/emoji.json");
  return testRegexpArray(input);
};

exports.all = function (input) {
  _util2.default.prepFile("replace/contractions.txt");
  _util2.default.prepFile("replace/spellfix.txt");
  _util2.default.prepFile("replace/british.txt");
  _util2.default.prepFile("replace/substitutes.txt");
  _util2.default.prepFile("replace/frivolous.txt");
  return testRegexpArray(input);
};

var testRegexpArray = function testRegexpArray() {
  var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

  msg = _clean2.default.pre(msg);

  var splitMsg = msg.toLowerCase().split(' ');
  splitMsg.some(function (word) {
    if (word !== 'should') {
      if (_util2.default.replacements[word]) {
        _util2.default.replacements[word].some(function (phrase) {
          // console.log(`Testing "${phrase.phrase}"`);
          var prevMsg = msg;
          msg = msg.replace(phrase.phraseRegex, phrase.replacementRegex);
          if (msg === "" || msg === " ") msg = prevMsg;
        });
      }
    }
  });

  msg = _clean2.default.post(msg);

  return msg.trim();
};