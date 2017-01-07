import util from './util';
import clean from './clean';

const testRegexpArray = (msg = '') => {
  msg = clean.pre(msg);

  const splitMsg = msg.toLowerCase().split(' ');
  splitMsg.forEach((word) => {
    let replacements = util.replacements[word];
    // in cases like 'kgs.' we don't want to strip punctuation, so only clean if
    // the replacement in its basic form doesn't exist
    if (!replacements) {
      const cleanedWord = util.cleanWord(word);
      replacements = util.replacements[cleanedWord];
    }
    if (replacements) {
      replacements.forEach((phrase) => {
        // console.log(`Testing "${cleanedWord} - ${phrase.phrase}"`);
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
  util.prepFile('replace/british.txt');
  util.prepFile('replace/contractions.txt');
  util.prepFile('replace/emoji.json');
  util.prepFile('replace/frivolous.txt');
  util.prepFile('replace/spellfix.txt');
  util.prepFile('replace/substitutes.txt');
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
