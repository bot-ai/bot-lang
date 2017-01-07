import fs from 'fs';
import path from 'path';

const dataDir = path.join(__dirname, '../data/');
const re11 = new RegExp(/_/g);
const replacements = {};
const fileCache = [];

const quotemeta = function quotemeta(string) {
  const unsafe = '\\.+*?[^]$(){}=!<>|:';
  for (let i = 0; i < unsafe.length; i++) {
    string = string.replace(new RegExp(`\\${unsafe.charAt(i)}`, 'g'), `\\${unsafe.charAt(i)}`);
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
    if (word !== '') {
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

      replacements[word].push({ phrase, replacement, phraseRegex, replacementRegex, source });
      replacements[word].sort((a, b) => (b.phrase.split(' ').length - a.phrase.split(' ').length));
    }
  });
};

const textFile = (file) => {
  const source = file.replace('.txt', '');
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
};

/**
 * The default json format is and array of objects with a phase / replacement keys
 * key = replacement and value is the match phrase.
 */
const jsonFile = (file) => {
  const source = file.replace('.json', '');
  const contents = fs.readFileSync(dataDir + file, 'utf8');
  const data = JSON.parse(contents);
  for (let i = 0; i < data.length; i++) {
    const phrase = data[i].phrase;
    const replacement = data[i].replacement;
    lineHandle(source, phrase, replacement);
  }

  fileCache.push(file);
};

const prepFile = function prepFile(file) {
  if (fileCache.indexOf(file) === -1) {
    if (file.indexOf('.txt') !== -1) {
      textFile(file);
    } else if (file.indexOf('.json') !== -1) {
      jsonFile(file);
    }
  }
};

const uniq = function uniq(a) {
  return a.sort().filter((item, pos, ary) => !pos || item !== ary[pos - 1]);
};

const CLEAN_REGEX = /[\w'-]+/i;

const cleanWord = (word = '') => {
  const matches = word.match(CLEAN_REGEX);
  return matches ? matches[0] : word;
};

export default { cleanWord, prepFile, quotemeta, replacements, uniq };
