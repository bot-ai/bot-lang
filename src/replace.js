import fs from "fs";
import path from "path";
import util from "./util";

const re1 = new RegExp(/\+/g);
const re2 = new RegExp(/\t/g);
const re3 = new RegExp(/\s+/g);
const re4 = new RegExp(/(’|‘)/g);
const re5 = new RegExp(/(“|”)/g);
const re6 = new RegExp(/(–|—)/g);
const re7 = new RegExp(/[^\x00-\x7F]/g);
const re8 = new RegExp(/[\+]{1}/g);
const re9 = new RegExp(/<plus>/g);
const re10 = new RegExp(/\d,\d/g);
const re11 = new RegExp(/_/g);


exports.contraction = function(input) {
  return testRegexpArray(util.prepFile("replace/contractions.txt"), input);
}

exports.spellfix = function(input) {
  return testRegexpArray(util.prepFile("replace/spellfix.txt"), input);
}

exports.substitutes = function(input) {
  return testRegexpArray(util.prepFile("replace/substitutes.txt"), input); 
}

exports.british = function(input) {
  return testRegexpArray(util.prepFile("replace/british.txt"), input); 
}

const testRegexpArray = function(replacements, msg) {

  msg = msg.replace(re1, '<plus>');
  msg = msg.replace(re2, ' ');
  msg = msg.replace(re3, ' ');
  msg = msg.replace(re4, "'");
  msg = msg.replace(re5, '"');
  msg = msg.replace(re6, '—');
  msg = msg.replace(re7, '');

  let splitMsg = msg.toLowerCase().split(' ');
  splitMsg.some((word) => {
    if (replacements[word]) {
      replacements[word].some((phrase) => {
        // console.log(`Testing "${phrase.phrase}"`);
        msg = msg.replace(phrase.phraseRegex, phrase.replacementRegex);
      });
    }
  });

  msg = msg.replace(re8, ' ');
  msg = msg.replace(re9, '+');
  msg = msg.replace(re11, ' ');
  msg = msg.replace(re10, v => v.replace(',', ''));

  return msg.trim();
}
