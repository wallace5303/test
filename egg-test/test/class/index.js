'use strict';

const ClassA = require('./classA');
const ClassC = require('./classC');

const EGG_LOADER = Symbol.for('egg#loader');

class ClassB extends ClassA {
  constructor(m, n) {
    super(3, 4);
    // this.m = m;
    // this.n = n;
    //this.loader4();
    this.loader4.helloC()
    //console.log('loader4:', this.loader4.helloC());
    // let objC = new ClassC();
    // objC.helloC();
    this.hello().then((res)=>{
      console.log('nage:', res);
    });
    console.log('nage2:', 's');
  }

  async hello () {
    let config = {
      name: 'bb',
      age: 22
    }
    return config;
  }

  get [EGG_LOADER]() {
    return ClassC;
  }

  test () {
    return true;
  }
}

ClassB.prototype.name = 3;

//et objB = new ClassB();
// objB.test();

// const loaders = [
//   require('./plugin'),
// ];

// for (const loader of loaders) {
//   console.log(loader)
// }
console.log(process.cwd())


