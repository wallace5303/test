'use strict';

const EGG_LOADER = Symbol.for('egg#loader');
const EGG_LOADER2 = 'egg#loader2';
class PointA {
  constructor(a) {
    this.a = a;
    console.log('a:', a)
    this.load = this[EGG_LOADER];
    this.load.test = 44;
    this.loader2 = this[EGG_LOADER2];
    this.loader2.test =55;
    this.loader3 = this.lo3;
    this.loader3.test =55;
    this.loader4 = this.lo4();
    this.loader4.test =66;
  }

  static toString() {
    console.log('to string A');
    return true;
  }

  get [EGG_LOADER]() {
    return {'name':'gsx', age:12};
  }

  get [EGG_LOADER2]() {
    return {'name':'kaka', age:12};
  }
  get lo3() {
    return {'name':'wallace', age:12};
  }
  lo4() {
    return {'name':'summer', age:12};
  }
}

module.exports = PointA;