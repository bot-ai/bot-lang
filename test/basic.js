var mocha = require("mocha");
var assert = require("assert");
var norm = require("../src/index");
var tag = require("../src/tag");
var replace = require("../src/replace");

import clean from "../src/clean";

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

    it("should not remove +", function() {
      assert.equal(clean.all("3+4=7"), "3+4=7");
    });

    it("should remove extra spaces", function() {
      assert.equal(clean.all("this    is     spaced     out"), "this is spaced out");
    });

    it("Fix numbers", function() {
      assert.equal(clean.all("how much is 1,000.00"), "how much is 1000.00");
    });

    it("Fix Unicode characters", function() {
      assert.equal(clean.all("What’s up"), "What's up");
      assert.equal(clean.all("I said “shut up”"), 'I said "shut up"');
      assert.equal(clean.all("œ"), '');
      assert.equal(clean.all("😊"), '😊');
      
    });
  });


  describe('Replace Interface', function() {
    it("should replace subsitutes", function() {
      assert.equal(replace.all("Nov 1st"), "November 1st");
      assert.equal(replace.all("Nov 1st I weighed 90 kgs. total"), "November 1st I weighed 90 kilograms total");
      assert.equal(replace.all("I shared it on FB w/ friends, ie: you"), "I shared it on Facebook with friends, for example : you");
    });

    it("should expand contractions", function() {
      assert.equal(replace.all("I'm on the yelow zebra"), "I am on the yellow zebra");
      assert.equal(replace.all("I'll listen to y'all"), "I will listen to you all");
      assert.equal(replace.all("do n't make it right"), "do not make it right");
      assert.equal(replace.all("it's all good"), "it is all good");
      assert.equal(replace.all("What's up"), "what is up");
    });

    it("should swap british / canadian words", function() {
      assert.equal(replace.all("armour axe coloured gold"), "armor ax colored gold");
    });

    it("should swap unicode emoji's for keywords", function() {
      assert.equal(replace.emoji("You make me 😊"), "You make me :blush:");
    });

    it("should fix spelling", function() {
      assert.equal(replace.all("are we sceduled thrsday for teh restraunt"), "are we scheduled Thursday for the restaurant");
    });

    it("should remove frivolous words", function() {
      assert.equal(replace.all("Well , I could not help it, could I"), "I could not help it, could I")
    });

    it("frivolous - lets not replace everything", function() {
      assert.equal(replace.frivolous("let me see"), "let me see");
      assert.equal(replace.frivolous("ahh let me see"), "let me see");
    });

    it("Spell Fix 2 word combo", function() {
      assert.equal(replace.all("hwo do you"), "how do you");
      assert.equal(replace.all("hwo is you"), "who is you");
    });
  });

  describe('Tagging Interface', function() {
  
    it("should tag input", function() {
      assert.equal(tag.test("yes", "I am sure"), true);
      assert.equal(tag.test("yes", "Nope"), false, "yes is not nope");
      assert.equal(tag.test("no", "Nope"), true);
      assert.equal(tag.test("apology", "well excuse me princess"), false);
      assert.equal(tag.test("apology", "excuse me princess"), true);
    });

    it("should have all", function() {
      assert.deepEqual(tag.all("eww , shut up , I have to go"), [ 'disgust', 'goodbye', 'stop' ]);
    });

    it("should have emoji", function() {
      assert.deepEqual(tag.all(":wave: :one: :heart:"), ['slack_emoji_people', 'slack_emoji_symbols']);
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
