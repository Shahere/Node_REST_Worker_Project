const { parentPort, workerData } = require('worker_threads')
const { WebSocketServer } = require('ws');
let logger;
try{
   logger = require('logger').createLogger("logs/"+workerData.name+"-"+new Date().toISOString())
}catch (e) {
  logger = require('logger').createLogger()
}
logger.setLevel('debug')
logger.info("PORT: "+workerData.port)
const wss = new WebSocketServer({ port: workerData.port });

logger.info("Launching WS...")

/*function writeToFile(log){
  const logFilePath = path.join(__dirname, `${workerData.workerName}.log`)
  const formatedLog = `[${new Date().toISOString()}] ${log}\n`

  fs.appendFile(logFilePath, formatedLog, (err) => {
    if (err) console.log('Error while writing log in file')
  })
}*/

wss.on('connection', function connection(wss) {
  logger.info("Connection established")
  let increment = 0;
  add(increment);

  function add(i) {
    if (i !== 100) {
      increment = i + 1;
      setTimeout(() => { add(increment) }, 1000)
      wss.send(`${workerData.name} says that i is ${increment}`);
      logger.debug(`${workerData.name} says that i is ${increment}`)
    } else {
      const message = workerData.name + ' is done'
      parentPort.postMessage(message)
      wss.send(`${workerData.name} is done`);
      logger.info(`${workerData.name} is done`)
    }
    return i
  }


  wss.on('message', function message(data) {
    console.log('received: %s', data);
    logger.info(`received: ${data}`)
  });

  wss.on('error', function errorWS(data) {
    console.error(data)
    logger.error(data)
  })
});

//send message
parentPort.postMessage("INIT")

