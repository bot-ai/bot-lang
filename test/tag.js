var mocha = require("mocha");
var assert = require("assert");
var kw = require("../lib/tag");

describe('Tag input', function(){
  var startTime;

  before(function(done){
    startTime = new Date();
    done();
  });

  after(function(done) {
    console.log('Test duration: ' + (new Date() - startTime) + 'ms');
    done();
  })

  describe('Should clean input', function() {
  
    it("should tag input", function() {
      assert.equal(kw.testInput("yes", "I am sure"), true);
      assert.equal(kw.testInput("yes", "Nope"), false, "yes is not nope");
      assert.equal(kw.testInput("no", "Nope"), true);
      assert.equal(kw.testInput("apology", "well excuse me princess"), false);
      assert.equal(kw.testInput("apology", "excuse me princess"), true);
    });

    it("should have all", function() {
      assert.deepEqual(kw.testAll("eww , shut up , I have to go"), [ 'disgust', 'goodbye', 'stop' ]);
    });
  });
});
