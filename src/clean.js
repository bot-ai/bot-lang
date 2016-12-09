const re1 = new RegExp(/\+/g);
const re2 = new RegExp(/\t/g);
const re3 = new RegExp(/\s+/g);
const re4 = new RegExp(/(’|‘)/g);
const re5 = new RegExp(/(“|”)/g);
const re6 = new RegExp(/(–|—)/g);
const re7 = new RegExp(/[\u00A1-\u1EF3]/g);
const re8 = new RegExp(/[+]{1}/g);
const re9 = new RegExp(/<plus>/g);
const re10 = new RegExp(/\d,\d/g);
// const re11 = new RegExp(/_/g);

const pre = function pre(msg = '') {
  msg = msg.replace(re1, '<plus>');
  msg = msg.replace(re2, ' ');
  msg = msg.replace(re3, ' ');
  msg = msg.replace(re4, "'");
  msg = msg.replace(re5, '"');
  msg = msg.replace(re6, '—');
  msg = msg.replace(re7, ' ');

  return msg;
};

const post = function post(msg = '') {
  msg = msg.replace(re8, ' ');
  msg = msg.replace(re9, '+');
  // msg = msg.replace(re11, ' ');
  msg = msg.replace(re10, v => v.replace(',', ''));
  return msg;
};

const all = function all(msg = '') {
  return post(pre(msg)).trim();
};

export default { pre, post, all };
