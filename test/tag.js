// TODO Add a real suite.
var kw = require("../lib/tag");
var assert = require("assert");

assert(kw.testInput("yes", "I am sure"));
assert(kw.testInput("yes", "Nope") === false);
assert(kw.testInput("no", "Nope"));

assert.deepEqual(kw.testAll("eww , shut up , I have to go"), [ 'disgust', 'goodbye', 'stop' ]);

console.log(kw.testAll("eww , shut up , I have to go"));