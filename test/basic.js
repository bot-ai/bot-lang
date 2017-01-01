/* global describe, before, after, it */

import mocha from 'mocha';
import assert from 'assert';
import lang from '../src';

describe('Bot-Lang', () => {
  let startTime;

  before((done) => {
    startTime = new Date();
    done();
  });

  after((done) => {
    console.log(`Test duration: ${new Date() - startTime}ms`);
    done();
  });

  describe('Should clean input', () => {
    it('should not remove +', () => {
      assert.equal(lang.clean.all('3+4=7'), '3+4=7');
    });

    it('should not remove double underbar', () => {
      assert.equal(lang.clean.all('__B__'), '__B__');
    });

    it('should remove extra spaces', () => {
      assert.equal(lang.clean.all('this    is     spaced     out'), 'this is spaced out');
    });

    it('Fix numbers', () => {
      assert.equal(lang.clean.all('how much is 1,000.00'), 'how much is 1000.00');
    });

    it('Fix Unicode characters', () => {
      assert.equal(lang.clean.all('What’s up'), "What's up");
      assert.equal(lang.clean.all('I said “shut up”'), 'I said "shut up"');
      assert.equal(lang.clean.all('œ'), '');
      assert.equal(lang.clean.all('😊'), '😊');
    });
  });

  describe('Replace Interface', () => {
    it('should replace subsitutes', () => {
      assert.equal(lang.replace.all('Nov 1st'), 'November 1st');
      assert.equal(lang.replace.all('Nov 1st I weighed 90 kgs. total'), 'November 1st I weighed 90 kilograms total');
      assert.equal(lang.replace.all('I shared it on FB w/ friends, ie: you'), 'I shared it on Facebook with friends, for example : you');
    });

    it('should expand contractions', () => {
      assert.equal(lang.replace.all("I'm on the yelow zebra"), 'I am on the yellow zebra');
      assert.equal(lang.replace.all("I'll listen to y'all"), 'I will listen to you all');
      assert.equal(lang.replace.all("do n't make it right"), 'do not make it right');
      assert.equal(lang.replace.all("it's all good"), 'it is all good');
      assert.equal(lang.replace.all("What's up"), 'what is up');
      // should check
      assert.equal(lang.replace.all("you shouldn't have"), 'you should not have');
      assert.equal(lang.replace.all('you should go'), 'you should go');
    });

    it('should swap british / canadian words', () => {
      assert.equal(lang.replace.all('armour axe coloured gold'), 'armor ax colored gold');
    });

    it("should swap unicode emoji's for keywords", () => {
      assert.equal(lang.replace.emoji('You make me 😊'), 'You make me :blush:');
    });

    it('should fix spelling', () => {
      assert.equal(lang.replace.all('are we sceduled thrsday for teh restraunt'), 'are we scheduled Thursday for the restaurant');
    });

    it('should remove frivolous words', () => {
      assert.equal(lang.replace.all('Well , I could not help it, could I'), 'I could not help it, could I');
    });

    it('frivolous - lets not replace everything', () => {
      assert.equal(lang.replace.frivolous('let me see'), 'let me see');
      assert.equal(lang.replace.frivolous('ahh let me see'), 'let me see');
    });

    it('Spell Fix 2 word combo', () => {
      assert.equal(lang.replace.all('hwo do you'), 'how do you');
      assert.equal(lang.replace.all('hwo is you'), 'who is you');
    });
  });

  describe('Tagging Interface', () => {
    it('should tag input', () => {
      assert.equal(lang.tag.test('yes', 'I am sure'), true);
      assert.equal(lang.tag.test('yes', 'Nope'), false);
      assert.equal(lang.tag.test('no', 'Nope'), true);
      assert.equal(lang.tag.test('apology', 'well excuse me princess'), false);
      assert.equal(lang.tag.test('apology', 'excuse me princess'), true);
    });

    it('should have all', () => {
      assert.deepEqual(lang.tag.all('eww , shut up , I have to go'), ['disgust', 'goodbye', 'stop']);
      assert.deepEqual(lang.tag.all('no'), ['no']);
    });

    it('should have emoji', () => {
      assert.deepEqual(lang.tag.all(':wave: :one: :heart:'), ['slack_emoji_people', 'slack_emoji_symbols']);
    });
  });

  describe('Tagging Intents', function() {
    it("should tag intent 1", function() {
      assert.deepEqual(lang.tag.all("John went to the kitchen"), ["intent_move"]);
    });

    it("should tag intent 2", function() {
      assert.deepEqual(lang.tag.all("John got the ball"), ['intent_get']);
    });

    it.skip("should tag intent 3", function() {
      assert.equal(lang.tag.test("intent_move", "John went to the kitchen"), true);
    });
  });

  describe('Edge cases', () => {
    it('edge case 1', () => {
      assert.equal(lang.replace.all('okay my name is Adam'), 'okay my name is Adam');
      assert.equal(lang.replace.all('yes it is the capital of spain'), 'yes it is the capital of spain');
    });
  });
});
