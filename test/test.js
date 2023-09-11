'use strict';

var str="Hello world!";
//查找"Hello"
var patt=/Hello/g;
var result=patt.test(str);
console.log('re:', result); 

// module.exports = function() {
    
// }    
// exports.login = function(a, b) {
//     return function (c, d, callback) {
//         let c = a + b;
//         console.log(c);
//         return callback('hello');
//     }
// }

// exports.login = function(a, b, callback) {
//     let c = a + b;
//     console.log(c);
//     return callback('hello');
// }

// exports.login = function(a, b) {
//     let c = a + b;
//     console.log(c);

//     return c;
// }