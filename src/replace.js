import fs from "fs";
import path from "path";
import util from "./util";
import clean from "./clean";

exports.contraction = function(input) {
  util.prepFile("replace/contractions.txt");
  return testRegexpArray(input);
}

exports.spellfix = function(input) {
  util.prepFile("replace/spellfix.txt");
  return testRegexpArray(input);
}

exports.substitutes = function(input) {
  util.prepFile("replace/substitutes.txt");
  return testRegexpArray(input); 
}

exports.frivolous = function(input) {
  util.prepFile("replace/frivolous.txt");
  return testRegexpArray(input);
}

exports.british = function(input) {
  util.prepFile("replace/british.txt");
  return testRegexpArray(input); 
}

exports.emoji = function(input) {
  util.prepFile("replace/emoji.json");
  return testRegexpArray(input); 
}

exports.all = function(input) {
  util.prepFile("replace/contractions.txt");
  util.prepFile("replace/spellfix.txt");
  util.prepFile("replace/british.txt");
  util.prepFile("replace/substitutes.txt");
  util.prepFile("replace/frivolous.txt");
  return testRegexpArray(input);
}

const testRegexpArray = function(msg = "") {
  msg = clean.pre(msg);

  let splitMsg = msg.toLowerCase().split(' ');
  splitMsg.some((word) => {
    if (util.replacements[word]) {
      util.replacements[word].some((phrase) => {
        // console.log(`Testing "${phrase.phrase}"`);
        let prevMsg = msg;
        msg = msg.replace(phrase.phraseRegex, phrase.replacementRegex);
        if (msg === "" || msg === " ") msg = prevMsg;
      });
    }
  });

  msg = clean.post(msg);

  return msg.trim();
}
