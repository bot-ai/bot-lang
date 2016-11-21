import fs from "fs";
import path from "path";
import util from "./util";


const dataDir = path.join(__dirname, '../data/tag/');

const testRegexpArray = function(replacements, msg) {
  let splitMsg = msg.toLowerCase().split(' ');
  return splitMsg.some((word) => {
    if (replacements[word]) {
      return replacements[word].some((phrase) => {
        // console.log(`Testing "${phrase.phrase}"`);
        if (phrase.phraseRegex.test(msg)) {
          return true;
        }
      });
    }
  });

  return false;
}

exports.testAll = function(input) {
  var p = path.join(__dirname, "../data/tag/");
  var files = fs.readdirSync(p);
  var set = [];
  for (var i = 0; i < files.length; i++) {
    if (testRegexpArray(util.prepFile(`tag/${files[i]}`), input) === true) {
      set.push(files[i].replace(".txt", ""));
    }
  }
  
  return set;
}

exports.testInput = function(fileString, input) {
  if (fileString.slice(-4) !== ".txt") {
    fileString += ".txt";
  }
  return testRegexpArray(util.prepFile(`tag/${fileString}`), input);
}
