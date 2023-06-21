'use strict';

const _ = require('lodash');
const utils = require('../utils/index');

// const obj = require('./jsm.js');
// const obj2 = {};
// console.log("obj:", !obj2);
// if (!obj) {
//   console.log("obj:", obj);
// };
// console.log("r:", r);

// const Module = module.constructor.length > 1
//   ? module.constructor
//   : BuiltinModule;

//   let r = Module._extensions['js'];
//   console.log("r:", module.constructor);
//   console.log("_extension:", Module._extension);


function paramsTest(name, ...config){
  let a = 1;
  let b = 2;
  console.log("name:", name);
  console.log("config:", config);
  return 's'
}

let ret = paramsTest('gsx', 12, 'kaka', '198');
console.log("ret:", ret);