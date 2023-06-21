'use strict';

class Task {
  static age = 21;
  constructor({ maxLength = Infinity }) {
    this.queue = [];
    this.taskMap = new Map();
    this.maxLength = maxLength;
  }

  name() {
    Task.age = 33;
    return 'gsx';
  }
}

const a = new Task(10);
console.log(Task);
console.log(a);
console.log(a.queue);
console.log(Task.age);
console.log(a.name());
console.log(Task.age);