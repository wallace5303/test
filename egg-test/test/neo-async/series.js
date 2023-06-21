'use strict';

var async = require('neo-async');
var order = [];
var tasks = [
 function(done) {
  console.log('1');
  order.push(1);
  
  setTimeout(function(){
    order.push(5);
    done('ee', 1);
  }, 2000);
  //order.push(5);
  console.log('b');
 },
 function(next) {
  console.log('2');
  order.push(2);
  next(null, 2);
 }
];
async.series(tasks, function(err, res) {
  //console.log(res); 
  console.log(order); 
});

// var order = [];
// var tasks = [
//  function(done) {
//    setTimeout(function() {
//       console.log('1');
//      order.push(1);
//      done(null, 1);
//    }, 1000);
//  },
//  function(done) {
//    setTimeout(function() {
//       console.log('2');
//      order.push(2);
//      done(null, 2);
//    }, 3000);
//  },
//  function(done) {
//    setTimeout(function() {
//       console.log('3');
//      order.push(3);
//      done(null, 3);
//    }, 4000);
//  },
//  function(done) {
//    setTimeout(function() {
//       console.log('4');
//      order.push(4);
//      done(null, 4);
//    }, 2000);
//  }
// ];
// async.series(tasks, function(err, res) {
//   console.log(res); // [1, 2, 3, 4];
//   console.log(order); // [1, 2, 3, 4]
// });