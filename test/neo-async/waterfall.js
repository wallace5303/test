'use strict';

var async = require('neo-async');

var order = [];
var tasks = [
  function(next) {
    setTimeout(function() {
      order.push(1);
      next(null, 99);
    }, 10);
  },
  function(arg1, next) {
    console.log(arg1);
    setTimeout(function() {
      order.push(2);
      next(null, 1, 2);
    }, 30);
  },
  function(arg1, arg2, next) {
    setTimeout(function() {
      order.push(3);
      next(null, 3);
    }, 20);
  },
  function(arg1, next) {
    setTimeout(function() {
      order.push(4);
      next(null, 1);
    }, 40);
  }
];
async.waterfall(tasks, function(err, arg1, arg2, arg3, arg4) {
  console.log(order);
  console.log(arg1, arg2, arg3, arg4); // 1 2 3 4
});