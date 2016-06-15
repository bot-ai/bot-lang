// TODO Add a real suite.
var kw = require("../lib/keywords");
var assert = require("assert");

assert(kw.testInput("yes", "I am sure"));
assert(kw.testInput("yes", "Nope") === false);
assert(kw.testInput("no", "Nope"));
// console.log(kw.testInput("help", "gee thanks"));

assert.deepEqual(kw.testAll("eww , shut up , I have to go"), [ 'disgust', 'goodbye', 'stop' ]);