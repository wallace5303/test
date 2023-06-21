'use strict';

class CA {
  constructor(m, n) {
    this.m = m;
    this.n = n;
  }
  
  hello () {
    let config = {
      name: 'aa',
      age: 12
    }
    console.log(config);
    //return config;
  }

  get hello2 () {
    let config = {
      name: 'aa',
      age: 12
    }
    console.log(config);
    return config;
  }
}


module.exports = CA;