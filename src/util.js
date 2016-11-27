import fs from "fs";
import path from "path";

const dataDir = path.join(__dirname, '../data/');
const re11 = new RegExp(/_/g);
const replacements = {};
const fileCache = [];

const quotemeta = function (string) {
  const unsafe = "\\.+*?[^]$(){}=!<>|:";
  for (let i = 0; i < unsafe.length; i++) {
    string = string.replace(new RegExp("\\" + unsafe.charAt(i), "g"), "\\" + unsafe.charAt(i));
  }
  return string;
};

const lineHandle = function lineHandle(source, phrase, replacement = '') {
  let start = false;
  let end = false;

  if (phrase[0] === '<') {
    start = true;
    phrase = phrase.substring(1);
  }

  if (phrase.slice(-1) === '>') {
    end = true;
    phrase = phrase.substring(0, phrase.length - 1);
  }

  phrase = phrase.replace(re11, ' ');
  const cleanPhrase = quotemeta(phrase);

  phrase.split(' ').forEach((word) => {
    word = word.toLowerCase();
    if (word !== ""){

      if (word === 'should') {   
        return;   
      }

      if (replacements[word] === undefined) {
        replacements[word] = [];
      }

      let phraseRegex;
      let replacementRegex;

      if (start && end) {
        phraseRegex = new RegExp(`^${cleanPhrase}$`, 'gi');
        replacementRegex = replacement;
      } else if (start) {
        phraseRegex = new RegExp(`^${cleanPhrase}(\\W+|$)`, 'gi');
        replacementRegex = `${replacement}$1`;
      } else if (end) {
        phraseRegex = new RegExp(`(\\W+|^)${cleanPhrase}$`, 'gi');
        replacementRegex = `$1${replacement}`;
      } else {
        phraseRegex = new RegExp(`(\\W+|^)${cleanPhrase}(\\W+|$)`, 'gi');
        replacementRegex = `$1${replacement}$2`;
      }

      replacements[word].push({ phrase, replacement, phraseRegex, replacementRegex, source});
      replacements[word].sort((a, b) => (b.phrase.split(' ').length - a.phrase.split(' ').length));    
    }
  });
};

const textFile = function(file) {
  const source = file.replace(".txt", "");
  const data = fs.readFileSync(dataDir + file, 'utf8').split(/\r|\n/);  

  for (let i = 0; i < data.length; i++) {
    const line = data[i];
    let nline = line.trimLeft();

    // Let's allow comments with '#'
    const pos = nline.indexOf('#');

    if (pos === -1) {
      const parts = nline.split(' ');

      if (parts[1] === undefined) {
        lineHandle(source, parts[0], '');
      } else {
        lineHandle(source, parts[0], parts[1]);
      }
    } else if (pos > 0) {
      nline = nline.substr(0, pos);
      const parts = nline.split(' ');
      lineHandle(source, parts[0], parts[1]);
    }
  }

  fileCache.push(file);
}

/**
 * The default json format is and array of objects with a phase / replacement keys
 * key = replacement and value is the match phrase.
 */
const jsonFile = function(file) {
  var d = [];
  const source = file.replace(".json", "");
  var contents = require(dataDir + file);
  for (let i = 0; i < contents.length; i++) {
    const phrase = contents[i].phrase;
    const replacement = contents[i].replacement;
    lineHandle(source, phrase, replacement);
  }
}

const prepFile = function(file) {
  if (fileCache.indexOf(file) === -1) {
    if (file.indexOf(".txt") !== -1) {
      textFile(file);
    } else if (file.indexOf(".json") !== -1) {
      jsonFile(file);
    }
  }
}

const uniq = function(a) {
  return a.sort().filter(function(item, pos, ary) {
    return !pos || item != ary[pos - 1];
  })
}


export default {prepFile, quotemeta, replacements, uniq};
