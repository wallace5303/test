'use strict';

var async = require('neo-async');

var order = [];
var tasks = {
  'a': function(done) {
    setTimeout(function() {
      order.push(1);
      done(null, 1);
    }, 10);
  },
  'b': function(done) {
    setTimeout(function() {
      order.push(2);
      done(null, 2);
    }, 30);
  },
  'c': function(done) {
    setTimeout(function() {
      order.push(3);
      done(null, 3);
    }, 40);
  },
  'd': function(done) {
    setTimeout(function() {
      order.push(4);
      done(null, 4);
    }, 20);
  }
};
async.parallel(tasks, function(err, res) {
  console.log(res); // { a: 1, b: 2, c: 3, d:4 }
  console.log(order); // [1, 4, 2, 3]
});

console.log('dddd');