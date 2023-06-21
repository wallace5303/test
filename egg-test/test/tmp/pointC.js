

'use strict';

const PointB = require('./pointB');

class PointC extends PointB {
  constructor(c) {
    super(1);
    this.c = c;
    console.log('c:', this.c)
    this.objB = {
      id: 'C'
    }
  }

  static toString() {
    console.log('to string c');
    return true;
  }
}

let objc = new PointC(6); 