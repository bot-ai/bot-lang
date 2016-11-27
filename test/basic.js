var mocha = require("mocha");
var assert = require("assert");
var norm = require("../src/index");
var tag = require("../src/tag");

describe('Bot-Lang', function(){
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

    it("should replace subsitutes", function() {
      assert.equal(norm.clean("Nov 1st"), "November 1st");
      assert.equal(norm.clean("Nov 1st I weighed 90 kgs. total"), "November 1st I weighed 90 kilograms total");
      assert.equal(norm.clean("I shared it on FB w/ friends, ie: you"), "I shared it on Facebook with friends, for example : you");
    });

    it("should expand contractions", function() {
      assert.equal(norm.clean("I'm on the yelow zebra"), "I am on the yellow zebra");
      assert.equal(norm.clean("I'll listen to y'all"), "I will listen to you all");
      assert.equal(norm.clean("do n't make it right"), "do not make it right");
      assert.equal(norm.clean("it's all good"), "it is all good");
    });

    it("should swap british / canadian words", function() {
      assert.equal(norm.clean("armour axe coloured gold"), "armor ax colored gold");
    });

    it("should fix spelling", function() {
      assert.equal(norm.clean("are we sceduled thrsday for teh restraunt"), "are we scheduled Thursday for the restaurant");
    });

    it("should clean this", function() {
      assert.equal(norm.clean("Well , I could not help it, could I"), "I could not help it, could I")
    });

    it("should not remove +", function() {
      assert.equal(norm.clean("3+4=7"), "3+4=7");
    });

    it("should remove extra spaces", function() {
      assert.equal(norm.clean("this    is     spaced     out"), "this is spaced out");
    });

    it("Fix numbers", function() {
      assert.equal(norm.clean("how much is 1,000.00"), "how much is 1000.00");
    });

    it("Spell Fix 2 word combo", function() {
      assert.equal(norm.clean("hwo do you"), "how do you");
      assert.equal(norm.clean("hwo is you"), "who is you");
    });

    it("Fix ASCII characters", function() {
      assert.equal(norm.clean("What’s up"), "what is up");
      assert.equal(norm.clean("What's up"), "what is up");
      assert.equal(norm.clean("I said “shut up”"), 'I said "shut up"');
      assert.equal(norm.clean("œ"), '');
    });

  });

  
  describe('Tagging', function() {
  
    it("should tag input", function() {
      assert.equal(tag.testInput("yes", "I am sure"), true);
      assert.equal(tag.testInput("yes", "Nope"), false, "yes is not nope");
      assert.equal(tag.testInput("no", "Nope"), true);
      assert.equal(tag.testInput("apology", "well excuse me princess"), false);
      assert.equal(tag.testInput("apology", "excuse me princess"), true);
    });

    it("should have all", function() {
      assert.deepEqual(tag.testAll("eww , shut up , I have to go"), [ 'disgust', 'goodbye', 'stop' ]);
    });
  });
  
});


  // describe('Matching', function() {
  //   // <it_is>
  //   describe('<xxx>', function() {
  //     it('should match start and end', function() {
  //       norm.clean('it is').should.eql("~yes");
  //     });

  //     it('should not match start', function() {
  //       norm.clean('it is abc').should.eql("it is abc");
  //     });

  //     it('should not match end', function() {
  //       norm.clean('abc it is').should.eql('abc it is');
  //     });

  //     it('should not match middle', function() {
  //       norm.clean('abc it is abc').should.eql('abc it is abc');
  //     });
  //   });

  //   // <ew
  //   describe('<xxx', function() {
  //     it('should match start and end', function() {
  //       norm.clean('ew').should.eql("~emodisgust");
  //     });

  //     it('should match start', function() {
  //       norm.clean('ew abc').should.eql("~emodisgust abc");
  //     });

  //     it('should not match end', function() {
  //       norm.clean('abc ew').should.eql("abc ew");
  //     });

  //     it('should not match middle', function() {
  //       norm.clean('abc ew abc').should.eql("abc ew abc");
  //     });
  //   });

  //   // have_to_go>
  //   describe('xxx>', function() {
  //     it('should match start and end', function() {
  //       norm.clean('have to go').should.eql("~emogoodbye");
  //     });

  //     it('should not match start', function() {
  //       norm.clean('have to go abc').should.eql("have to go abc");
  //     });

  //     it('should match end', function() {
  //       norm.clean('abc have to go').should.eql("abc ~emogoodbye")
  //     });

  //     it('should not match middle', function() {
  //       norm.clean('abc have to go abc').should.eql("abc have to go abc")
  //     });
  //   });

  //   // okay
  //   describe('xxx', function() {
  //     it('should match start and end', function() {
  //       norm.clean('okay').should.eql("~yes");
  //     });

  //     it('should match start', function() {
  //       norm.clean('okay abc').should.eql("~yes abc");
  //     });

  //     it('should match end', function() {
  //       norm.clean('abc okay').should.eql("abc ~yes");
  //     });

  //     it('should match middle', function() {
  //       norm.clean('abc okay abc').should.eql("abc ~yes abc");
  //     });
  //   })
