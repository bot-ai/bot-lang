import fs from "fs";
import path from "path";
import util from "./util";

const dataDir = path.join(__dirname, '../data/tag/');

const testRegexpArray = function(msg) {
  const splitMsg = msg.toLowerCase().split(' ');
  const set = [];
  for (let i = 0; i < splitMsg.length; i++) {
    const word = splitMsg[i];
    if (word === 'should') {   
      break;   
    }

    if (util.replacements[word]) {
      let x = util.replacements[word].filter((phrase) => {
        return phrase.phraseRegex.test(msg);
      })
      x.forEach((phrase) => {set.push(phrase.source)});
    }
  }
  return util.uniq(set);
}

const filterTag = function(a = []) {
  let set = a.filter(function(x) {
    return x.indexOf("tag") !== -1
  });
  return set.map(function(x) { 
    return x.replace("tag/", "");
  });
}

exports.all = function(input) {
  let p = path.join(__dirname, "../data/tag/");
  const files = fs.readdirSync(p);
  for (let i = 0; i < files.length; i++) {
    util.prepFile(`tag/${files[i]}`);
  }

  return filterTag(testRegexpArray(input));
}

exports.test = function(fileString, input) {
  if (fileString.slice(-4) !== ".txt") {
    fileString += ".txt";
  }
  util.prepFile(`tag/${fileString}`);
  let res = filterTag(testRegexpArray(input));
  let source = fileString.replace(".txt", "");

  return res.indexOf(source) !== -1;
}
