'use strict';

const PointA = require('./pointA');

class PointB extends PointA{
  constructor(b) {
    super(2);
    this.b = b;
    console.log('b:', b)
    this.objB = {
      id: 'B'
    }
    console.log('objB:', this.objB)
  }

  static toString() {
    console.log('to string B');
    return true;
  }
}

module.exports = PointB;