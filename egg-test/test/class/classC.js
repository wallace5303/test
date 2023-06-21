'use strict';

const ClassZ = require('./classZ');

class ClassC extends ClassZ {

  helloC () {
    // this.m = m;
    // this.n = n;
    // console.log('ClassC m: %d, n: %d', this.m, this.n);
    console.log('hello:', this.hello());
  }

  // hello () {
  //   let config = {
  //     name: 'cc',
  //     age: 12
  //   }
  //   return config;
  // }
}


module.exports = ClassC;