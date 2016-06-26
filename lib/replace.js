var fs = require("fs");
var path = require("path");


exports.contraction = function(input) {
  var p = path.join(__dirname, "../data/replace/contractions.txt");
  var data = fs.readFileSync(p, "utf8").split("\n");
  var cs = data.map(function(line) {
    if (line) {
      return line.split(" ");
    }
  });

  cs.sort(function(a, b) {
    return b[0].length - a[0].length;
  });
  
  cs.forEach(function(match) {
    var re = new RegExp(match[0]);
    if(re.test(input)) {
      input = input.replace(re, " " + match[1].replace("_"," "));
      input = input.replace(/\s\s+/g, " ");
    }
  });

  return input;
}
