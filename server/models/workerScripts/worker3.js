const { parentPort, workerData } = require('worker_threads')
add(0);

function add(i){
  if (i !== 10) {
    setTimeout(()=>{add(i+1)},1000)
    console.log(` ${workerData.name} : ${i}`)
  }else{
    const message = workerData.name +' is Done. '
    parentPort.postMessage(message)
  }
}



