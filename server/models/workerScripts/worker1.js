const { parentPort, workerData } = require('worker_threads')
let increment = 0
while (increment !== Math.pow(10, 10)) {
  increment++
}
const message = workerData.name+' Intensive CPU task is done ! Result is : ' + increment
parentPort.postMessage(message)
