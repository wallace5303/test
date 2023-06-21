const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

// if (cluster.isMaster) {
//   const worker = cluster.fork();
//   worker.send('你好');
//   process.on('master message', (msg) => {
//     console.log('master log:' + msg);
//   });

// } else if (cluster.isWorker) {
//   process.on('message', (msg) => {
//     process.send("cluster:" + msg);
//     console.log('cluster log:' + msg);
//   });
// }

// if (cluster.isMaster) {
//   console.log(`主进程 ${process.pid} 正在运行`);

//   // 衍生工作进程。
//   for (let i = 0; i < 3; i++) {
//     cluster.fork();
//   }

//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`工作进程 ${worker.process.pid} 已退出`);
//   });
// } else {
//   // 工作进程可以共享任何 TCP 连接。
//   // 在本例子中，共享的是 HTTP 服务器。
//   http.createServer((req, res) => {
//     res.writeHead(200);
//     res.end('hello\n');
//   }).listen(8000);

//     process.on('message', function(obj) {
//       console.log('[worker] message recieved:', obj);
//     });
//   console.log(`工作进程 ${process.pid} 已启动`);
// }