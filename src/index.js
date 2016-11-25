var replace = require("./replace");

exports.clean = function(input) {
  input = replace.contraction(input);
  input = replace.spellfix(input);
  input = replace.substitutes(input);
  input = replace.british(input);
  return input;
};