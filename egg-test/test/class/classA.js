'use strict';

const EGG_LOADER = Symbol.for('egg#loader');
const ClassZ = require('./classZ');


class ClassA {
  constructor(m, n) {
    this.m = m;
    this.n = n;
    //console.log('m: %d, n: %d', this.m, this.n);
    console.log('z:', this.z);
    const Loader = this[EGG_LOADER];
    this.loader4 = new Loader(1,2);
  }

  get [EGG_LOADER]() {
    return ClassZ;
  }
  
  hello () {
    let config = {
      name: 'aa',
      age: 12
    }
    return config;
  }
}


module.exports = ClassA;