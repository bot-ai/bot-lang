import util from './util';
import clean from './clean';

const testRegexpArray = (msg = '') => {
  msg = clean.pre(msg);

  const splitMsg = msg.toLowerCase().split(' ');
  splitMsg.forEach((word) => {
    if (util.replacements[word]) {
      util.replacements[word].forEach((phrase) => {
        // console.log(`Testing "${word} - ${phrase.phrase}"`);
        if (phrase.source.indexOf('replace') !== -1) {
          const prevMsg = msg;
          msg = msg.replace(phrase.phraseRegex, phrase.replacementRegex);
          if (msg === '' || msg === ' ') {
            msg = prevMsg;
          }
        }
      });
    }
  });

  msg = clean.post(msg);

  return msg.trim();
};

const british = function british(input) {
  util.prepFile('replace/british.txt');
  return testRegexpArray(input);
};

const contraction = function contraction(input) {
  util.prepFile('replace/contractions.txt');
  return testRegexpArray(input);
};

const emoji = function emoji(input) {
  util.prepFile('replace/emoji.json');
  return testRegexpArray(input);
};

const frivolous = function frivolous(input) {
  util.prepFile('replace/frivolous.txt');
  return testRegexpArray(input);
};

const spellfix = function spellfix(input) {
  util.prepFile('replace/spellfix.txt');
  return testRegexpArray(input);
};

const substitutes = function substitutes(input) {
  util.prepFile('replace/substitutes.txt');
  return testRegexpArray(input);
};

const all = function all(input) {
  util.prepFile('replace/contractions.txt');
  util.prepFile('replace/spellfix.txt');
  util.prepFile('replace/british.txt');
  util.prepFile('replace/substitutes.txt');
  util.prepFile('replace/frivolous.txt');
  return testRegexpArray(input);
};

export default {
  all,
  british,
  contraction,
  emoji,
  frivolous,
  spellfix,
  substitutes,
};
