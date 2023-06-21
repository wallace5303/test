const cp = require('child_process');
const n = cp.fork(`${__dirname}/sub.js`);

// n.on('message', (m) => {
//   console.log('PARENT got message:', m);
// });

// Causes the child to print: CHILD got message: { hello: 'world' }

setTimeout(function(){
  n.send({ name: 'world' });
}, 5000)
