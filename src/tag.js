import fs from 'fs';
import path from 'path';
import util from './util';

const dataDir = path.join(__dirname, '../data/tag/');

const testRegexpArray = (msg) => {
  const splitMsg = msg.toLowerCase().split(' ');
  const set = [];
  for (let i = 0; i < splitMsg.length; i++) {
    const word = splitMsg[i];

    if (util.replacements[word]) {
      for (let j = 0; j < util.replacements[word].length; j++) {
        const phrase = util.replacements[word][j];
        if (phrase.phraseRegex.test(msg)) {
          set.push(phrase.source);
        }
      }
    }
  }
  return util.uniq(set);
};

const filterTag = (a = []) => {
  const set = a.filter(x => x.indexOf('tag') !== -1);
  return set.map(x => x.replace('tag/', ''));
};

const all = function all(input) {
  const files = fs.readdirSync(dataDir);
  for (let i = 0; i < files.length; i++) {
    util.prepFile(`tag/${files[i]}`);
  }

  return filterTag(testRegexpArray(input));
};

const test = function test(fileString, input) {
  if (fileString.slice(-4) !== '.txt') {
    fileString += '.txt';
  }
  util.prepFile(`tag/${fileString}`);
  const res = filterTag(testRegexpArray(input));
  const source = fileString.replace('.txt', '');

  return res.indexOf(source) !== -1;
};

export default {
  all,
  test,
};
