// TODO Add a real suite.
var kw = require("../lib/keywords");
var assert = require("assert");

assert(kw.testInput("yes", "I am sure"));
assert(kw.testInput("yes", "Nope") === false);
assert(kw.testInput("no", "Nope"));