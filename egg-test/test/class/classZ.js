class ClassZ {
  constructor(m, n) {
    this.m = m;
    this.n = n;
    //console.log('m: %d, n: %d', this.m, this.n);
  }

  hello () {
    console.log('m: %d, n: %d', this.m, this.n);
    let config = {
      name: 'zz',
      age: 12
    }
    return config;
  }
}

module.exports = ClassZ;