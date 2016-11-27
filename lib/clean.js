'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var re1 = new RegExp(/\+/g);
var re2 = new RegExp(/\t/g);
var re3 = new RegExp(/\s+/g);
var re4 = new RegExp(/(’|‘)/g);
var re5 = new RegExp(/(“|”)/g);
var re6 = new RegExp(/(–|—)/g);
var re7 = new RegExp(/[\u00A1-\u1EF3]/g);
var re8 = new RegExp(/[\+]{1}/g);
var re9 = new RegExp(/<plus>/g);
var re10 = new RegExp(/\d,\d/g);
var re11 = new RegExp(/_/g);

var pre = function pre() {
  var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  msg = msg.replace(re1, '<plus>');
  msg = msg.replace(re2, ' ');
  msg = msg.replace(re3, ' ');
  msg = msg.replace(re4, "'");
  msg = msg.replace(re5, '"');
  msg = msg.replace(re6, '—');
  msg = msg.replace(re7, ' ');

  return msg;
};

var post = function post() {
  var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  msg = msg.replace(re8, ' ');
  msg = msg.replace(re9, '+');
  msg = msg.replace(re11, ' ');
  msg = msg.replace(re10, function (v) {
    return v.replace(',', '');
  });
  return msg;
};

var all = function all() {
  var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return post(pre(msg)).trim();
};

exports.default = { pre: pre, post: post, all: all };