"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dataDir = _path2.default.join(__dirname, '../data/');
var re11 = new RegExp(/_/g);
var replacements = {};
var fileCache = [];

var quotemeta = function quotemeta(string) {
  var unsafe = "\\.+*?[^]$(){}=!<>|:";
  for (var i = 0; i < unsafe.length; i++) {
    string = string.replace(new RegExp("\\" + unsafe.charAt(i), "g"), "\\" + unsafe.charAt(i));
  }
  return string;
};

var lineHandle = function lineHandle(source, phrase) {
  var replacement = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  var start = false;
  var end = false;

  if (phrase[0] === '<') {
    start = true;
    phrase = phrase.substring(1);
  }

  if (phrase.slice(-1) === '>') {
    end = true;
    phrase = phrase.substring(0, phrase.length - 1);
  }

  phrase = phrase.replace(re11, ' ');
  var cleanPhrase = quotemeta(phrase);

  phrase.split(' ').forEach(function (word) {
    word = word.toLowerCase();
    if (word !== "") {
      if (replacements[word] === undefined) {
        replacements[word] = [];
      }

      var phraseRegex = void 0;
      var replacementRegex = void 0;

      if (start && end) {
        phraseRegex = new RegExp("^" + cleanPhrase + "$", 'gi');
        replacementRegex = replacement;
      } else if (start) {
        phraseRegex = new RegExp("^" + cleanPhrase + "(\\W+|$)", 'gi');
        replacementRegex = replacement + "$1";
      } else if (end) {
        phraseRegex = new RegExp("(\\W+|^)" + cleanPhrase + "$", 'gi');
        replacementRegex = "$1" + replacement;
      } else {
        phraseRegex = new RegExp("(\\W+|^)" + cleanPhrase + "(\\W+|$)", 'gi');
        replacementRegex = "$1" + replacement + "$2";
      }

      replacements[word].push({ phrase: phrase, replacement: replacement, phraseRegex: phraseRegex, replacementRegex: replacementRegex, source: source });
      replacements[word].sort(function (a, b) {
        return b.phrase.split(' ').length - a.phrase.split(' ').length;
      });
    }
  });
};

var textFile = function textFile(file) {
  var source = file.replace(".txt", "");
  var data = _fs2.default.readFileSync(dataDir + file, 'utf8').split(/\r|\n/);

  for (var i = 0; i < data.length; i++) {
    var line = data[i];
    var nline = line.trimLeft();

    // Let's allow comments with '#'
    var pos = nline.indexOf('#');

    if (pos === -1) {
      var parts = nline.split(' ');

      if (parts[1] === undefined) {
        lineHandle(source, parts[0], '');
      } else {
        lineHandle(source, parts[0], parts[1]);
      }
    } else if (pos > 0) {
      nline = nline.substr(0, pos);
      var _parts = nline.split(' ');
      lineHandle(source, _parts[0], _parts[1]);
    }
  }

  fileCache.push(file);
};

/**
 * The default json format is and array of objects with a phase / replacement keys
 * key = replacement and value is the match phrase.
 */
var jsonFile = function jsonFile(file) {
  var d = [];
  var source = file.replace(".json", "");
  var contents = require(dataDir + file);
  for (var i = 0; i < contents.length; i++) {
    var phrase = contents[i].phrase;
    var replacement = contents[i].replacement;
    lineHandle(source, phrase, replacement);
  }
};

var prepFile = function prepFile(file) {
  if (fileCache.indexOf(file) === -1) {
    if (file.indexOf(".txt") !== -1) {
      textFile(file);
    } else if (file.indexOf(".json") !== -1) {
      jsonFile(file);
    }
  }
};

var uniq = function uniq(a) {
  return a.sort().filter(function (item, pos, ary) {
    return !pos || item != ary[pos - 1];
  });
};

exports.default = { prepFile: prepFile, quotemeta: quotemeta, replacements: replacements, uniq: uniq };