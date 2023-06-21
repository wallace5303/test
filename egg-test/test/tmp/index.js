'use strict';

const PointA = require('./pointA');

const EGG_LOADER = Symbol.for('egg#loader');
const EGG_LOADER2 = 'egg#loader2';

class PointB extends PointA {
  constructor(m, n) {
    super(3, 4);
    this.m = m;
    this.n = n;
    console.log('load.test:', this.loader4);
  }

  static toString() {
    console.log('to string b');
    return true;
  }

  get [EGG_LOADER]() {
    return {'name':'gsx1', age:13};
  }

  get [EGG_LOADER2]() {
    return {'name':'kaka2', age:12};
  }

  get lo3() {
    return {'name':'wallace2', age:12};
  }
  lo4() {
    return {'name':'summer2', age:12};
  }
}

let objB = new PointB(1, 2); 