process.on('message', (m) => {
  
  chixu(m.name);
});

// // Causes the parent to print: PARENT got message: { foo: 'bar', baz: null }
// process.send({ foo: 'bar', baz: NaN });

process.on('uncaughtException', function(err) {
  if (!(err instanceof Error)) {
    err = new Error(String(err));
  }

  if (err.name === 'Error') {
    err.name = 'unhandledExceptionError';
  }
  console.log('err:', err);

});

// process.on('disconnect', () => {
//   console.log('disconnect:');
// });

// process.on('exit', (code) => {
//   console.log('exit:', code);
// });

console.log('CHILD got message:');
chixu('aaa');

function chixu(name = '') {
  setInterval(function() {
    console.log(name)
  }, 1000);
}
