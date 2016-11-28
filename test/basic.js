var mocha = require("mocha");
var assert = require("assert");
import lang from "../src";

lang.util.prepFile("replace/contractions.txt");
lang.util.prepFile("replace/spellfix.txt");
lang.util.prepFile("replace/british.txt");
lang.util.prepFile("replace/substitutes.txt");
lang.util.prepFile("replace/frivolous.txt");

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
      assert.equal(lang.clean.all("3+4=7"), "3+4=7");
    });

    it("should not remove double underbar", function() {
      assert.equal(lang.clean.all("__B__"), "__B__");
    });

    it("should remove extra spaces", function() {
      assert.equal(lang.clean.all("this    is     spaced     out"), "this is spaced out");
    });

    it("Fix numbers", function() {
      assert.equal(lang.clean.all("how much is 1,000.00"), "how much is 1000.00");
    });

    it("Fix Unicode characters", function() {
      assert.equal(lang.clean.all("What’s up"), "What's up");
      assert.equal(lang.clean.all("I said “shut up”"), 'I said "shut up"');
      assert.equal(lang.clean.all("œ"), '');
      assert.equal(lang.clean.all("😊"), '😊');
    });
  });

  describe('Replace Interface', function() {
    it("should replace subsitutes", function() {
      assert.equal(lang.replace.all("Nov 1st"), "November 1st");
      assert.equal(lang.replace.all("Nov 1st I weighed 90 kgs. total"), "November 1st I weighed 90 kilograms total");
      assert.equal(lang.replace.all("I shared it on FB w/ friends, ie: you"), "I shared it on Facebook with friends, for example : you");
    });

    it("should expand contractions", function() {
      assert.equal(lang.replace.all("I'm on the yelow zebra"), "I am on the yellow zebra");
      assert.equal(lang.replace.all("I'll listen to y'all"), "I will listen to you all");
      assert.equal(lang.replace.all("do n't make it right"), "do not make it right");
      assert.equal(lang.replace.all("it's all good"), "it is all good");
      assert.equal(lang.replace.all("What's up"), "what is up");
      // should check
      assert.equal(lang.replace.all("you shouldn't have"), "you should not have");
    });

    it("should swap british / canadian words", function() {
      assert.equal(lang.replace.all("armour axe coloured gold"), "armor ax colored gold");
    });

    it("should swap unicode emoji's for keywords", function() {
      assert.equal(lang.replace.emoji("You make me 😊"), "You make me :blush:");
    });

    it("should fix spelling", function() {
      assert.equal(lang.replace.all("are we sceduled thrsday for teh restraunt"), "are we scheduled Thursday for the restaurant");
    });

    it("should remove frivolous words", function() {
      assert.equal(lang.replace.all("Well , I could not help it, could I"), "I could not help it, could I")
    });

    it("frivolous - lets not replace everything", function() {
      assert.equal(lang.replace.frivolous("let me see"), "let me see");
      assert.equal(lang.replace.frivolous("ahh let me see"), "let me see");
    });

    it("Spell Fix 2 word combo", function() {
      assert.equal(lang.replace.all("hwo do you"), "how do you");
      assert.equal(lang.replace.all("hwo is you"), "who is you");
    });
  });

  describe('Tagging Interface', function() {
    it("should tag input", function() {
      assert.equal(lang.tag.test("yes", "I am sure"), true);
      assert.equal(lang.tag.test("yes", "Nope"), false );
      assert.equal(lang.tag.test("no", "Nope"), true);
      assert.equal(lang.tag.test("apology", "well excuse me princess"), false);
      assert.equal(lang.tag.test("apology", "excuse me princess"), true);
    });

    it("should have all", function() {
      assert.deepEqual(lang.tag.all("eww , shut up , I have to go"), [ 'disgust', 'goodbye', 'stop' ]);
    });

    it("should have emoji", function() {
      assert.deepEqual(lang.tag.all(":wave: :one: :heart:"), ['slack_emoji_people', 'slack_emoji_symbols']);
    });
  });
});
