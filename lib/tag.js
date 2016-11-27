"use strict";

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _util = require("./util");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dataDir = _path2.default.join(__dirname, '../data/tag/');

var testRegexpArray = function testRegexpArray(msg) {
  var splitMsg = msg.toLowerCase().split(' ');
  var set = [];
  for (var i = 0; i < splitMsg.length; i++) {
    var word = splitMsg[i];
    if (_util2.default.replacements[word]) {
      for (var j = 0; j < _util2.default.replacements[word].length; j++) {
        var phrase = _util2.default.replacements[word][j];
        // console.log(`Testing "${phrase.phrase}"`);
        if (phrase.phraseRegex.test(msg)) {
          set.push(phrase.source);
          break;
        }
      }
    }
  }
  return _util2.default.uniq(set);
};

var filterTag = function filterTag() {
  var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var set = a.filter(function (x) {
    return x.indexOf("tag") !== -1;
  });
  return set.map(function (x) {
    return x.replace("tag/", "");
  });
};

exports.all = function (input) {
  var p = _path2.default.join(__dirname, "../data/tag/");
  var files = _fs2.default.readdirSync(p);
  for (var i = 0; i < files.length; i++) {
    _util2.default.prepFile("tag/" + files[i]);
  }

  return filterTag(testRegexpArray(input));
};

exports.test = function (fileString, input) {
  if (fileString.slice(-4) !== ".txt") {
    fileString += ".txt";
  }
  _util2.default.prepFile("tag/" + fileString);
  var res = filterTag(testRegexpArray(input));
  var source = fileString.replace(".txt", "");

  return res.indexOf(source) !== -1;
};