const { parentPort, workerData } = require('worker_threads')
const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(wss) {

  
let increment = 0;
add(increment);

function add(i){
  if (i !== 100) {
    increment = i+1;
    setTimeout(()=>{add(increment)},1000)
    wss.send(`${workerData.name} says that i is ${increment}`);
  }else{
    const message = workerData.name+' is done' 
    parentPort.postMessage(message)
    wss.send(`${workerData.name} is done`);
  }
  return i
}


  wss.on('message', function message(data) {
    console.log('received: %s', data);
  });

  
});



