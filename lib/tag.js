var fs = require("fs");
var path = require("path");

var quoteMetadata = function (string) {
  var unsafe = "\\.+*?[^]$(){}=!<>|:";
  for (var i = 0; i < unsafe.length; i++) {
    string = string.replace(new RegExp("\\" + unsafe.charAt(i), "g"), "\\" + unsafe.charAt(i));
  }
  return string;
};

var prepFile = function(file) {
  var set = [];
  var p = path.join(__dirname, "../data/tag/", file);
  var data = fs.readFileSync(p,'utf8').split("\n");


  for (var i = 0; i < data.length; i++) {
    if (data[i] === "") continue;

    var startM = false;
    var endM = false;
    var line = data[i].trim();
    if (line[0] === '<') {
      startM = true;
      line = line.substring(1);
    }

    if (line.slice(-1) == '>') {
      endM = true;
      line = line.substring(0, line.length - 1);
    }

    line = quoteMetadata(line.replace(/_/g, " "));
    
    if (startM && endM) {
      set.push(new RegExp("^" + line + "$", "gi"));
    } else if (startM) {
      set.push(new RegExp("^" + line , "gi"));
    } else if (endM) {
      set.push(new RegExp(line + "$", "gi"));
    } else {
      set.push(new RegExp(line, "gi"));
    }
  }

  return set.sort(function(a, b){
    return b.toString().length - a.toString().length;
  });
}

var testRegexpArray = function(regexes, input) {
  for (var i = 0; i < regexes.length; i++) {
    if (regexes[i].test(input)) {
      return true
    }
  }
  return false;
}

exports.testAll = function(input) {
  var p = path.join(__dirname, "../data/tag/");
  var files = fs.readdirSync(p);
  var set = [];
  for (var i = 0; i < files.length; i++) {
    if (testRegexpArray(prepFile(files[i]), input) === true) {
      set.push(files[i].replace(".txt", ""));
    }
  }
  
  return set;
}

exports.testInput = function(fileString, input) {
  if (fileString.slice(-4) !== ".txt") {
    fileString += ".txt";
  }
  return testRegexpArray(prepFile(fileString), input);
}
