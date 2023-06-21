
'use strict';

const _ = require('lodash');

console.log(`file://${__dirname}/app/index.html`);
console.log('you name is ${__dirname} cheng');
return;

_.each(require('../service'), (service, name) => {
  console.log('service:', service);
  console.log('name:', name);
  //services[name] = service;
});
return;

let bb = /^proteus-module/.test('eus');
console.log(bb);
return;

var users = [
    { 'user': 'barney', 'age': 36, 'active': true },
    { 'user': 'fred',   'age': 40, 'active': false }
  ];
   
  let aa = _.filter(users, function(o) { return !o.active; });
console.log(aa);
return;

// _.forEach([1, 2], function(value, key) {
//     console.log({value, key});
//     return true;
//     console.log('ss');
// });

// => Logs `1` then `2`.

// _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
// console.log(key);
// });

// let a = 1;
// let b = 2;
// let c = a + b;
// let d = a + c;
// let e = a + d;
// let f = a + e;
// console.log(f);


// let now = Date.now();
// let userShopItem = {
//   "buy_count": 0,
//   "time": {
//       //"create": 1587710349084,
//       "read_new": 1587710349084
//   }
// };
// let time = _.assign({}, _.get(userShopItem, { create: now }), {
//   update: now
// })
// console.log(time);

// var users = [
//     { 'user': 'barney',  'age': 36, 'active': true },
//     { 'user': 'fred',    'age': 40, 'active': false },
//     { 'user': 'pebbles', 'age': 1,  'active': true }
//   ];
   
//   let obj = _.find(users, function(o) { return o.age < 40; });
// console.log(obj);