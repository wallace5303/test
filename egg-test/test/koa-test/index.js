const Koa = require('koa');
const koaServe = require('koa-static');
const path = require('path');

// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });

// app.listen(3000);
const baseDir = process.cwd();
const staticDir = path.join(baseDir, 'public', 'dist3'); 
console.log('staticDir:', staticDir);
const koaApp = new Koa();	
koaApp.use(koaServe(staticDir));
koaApp.listen(4200, () => {
  console.log('server start')
});

