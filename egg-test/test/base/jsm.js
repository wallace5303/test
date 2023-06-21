'use strict';

const CA = require('./ca');

class PointB {
  constructor(m, n) {
    this.m = m;
    this.n = n;
  }

  static toString() {
    console.log('to string b');
    return true;
  }

  getAge () {
    return 33;
  }
}

function test (name) {
  console.log('name:', name.getAge());
}

function check (obj, index) {
  if (!obj[index]) {
    throw new Error(`index '${index}' not exists`);
  }
  check(obj[index], index);
}

let str = 'con.service';
let obj1 = {
  name: 'gsx',
  con: {
    service: function() {
      return 21;
    }
  },
  hegiht: {}
}
obj1.hegiht.event =21
console.log('obj1.hegiht.event:', obj1.hegiht.event);
return;
let obj2 = obj1;
obj2.name = 'g';
const actions = str.split('.');
console.log('actions:', actions);
actions.forEach(key => {
  console.log('key:', key);
  obj2 = obj2[key];
  //console.log('obj:', obj);
  if (!obj2) throw new Error(`key '${key}' not exists`);
  //check(obj, key);
});
console.log('obj1:', obj1);
console.log('obj2:', obj1.con.service());
// for () {

// }

// if (a.con.service) {
//   console.log('aa');
// }
return;

// let obj2 = new PointB();
// test(obj2);
//return;

// let b = new PointB(2,3);
// console.log('b:', Object.prototype);

// console.log("ret:", process);

let obja = {'name': 'gsx'};

CA.prototype.pathName = 'gsx';
let objb = new CA(1,2);

console.log("m:", objb.m);
return;

// const returnedTarget = Object.assign(obja, undefined);

// const keys = Object.getOwnPropertyNames(CA.prototype);

let ret = {}
let ret2 = {}
ret.hello = CA.prototype.hello();
// ret.hello.age = 32;

ret2.hello = function me () {
  let config = {
    name: 'bb',
    age: 22
  }
  console.log(this.sex);
  return config;
}
ret2.hello.sex = 32;

console.log(Object.prototype);