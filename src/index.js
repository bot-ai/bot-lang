var replace = require("./replace");

exports.clean = function(input) {
  input = replace.contraction(input);
  input = replace.substitutes(input);
  return input;
};