
const { Worker, workerData } = require('worker_threads')

const workerScripts = [];
workerScripts['worker1'] = './models/workerScripts/worker1.js';
workerScripts['worker2'] = './models/workerScripts/worker2.js';
workerScripts['worker3'] = './models/workerScripts/worker3.js';



class MyWorker{
    constructor({workerName,scriptName,workersService}){

        console.log({workerName,scriptName})
        this.workerName = workerName;
        this.scriptFile = workerScripts[scriptName];
        this.workersService = workersService
        this.job;
    }

    async start(){
        return new Promise((resolve, reject) => {
            const worker = new Worker( this.scriptFile, {workerData: {name:this.workerName,counter:42}} );
            this.job = worker;
            worker.on(
                'online', 
                () => { 
                    console.log('Launching intensive CPU task') 
                    this.workersService.touch(this.workerName,this);
                }
            );
            worker.on(
                'message', 
                messageFromWorker => {
                    console.log(messageFromWorker)
                    return resolve
                }
            );
            worker.on(
                'error', 
                reject
            );
            worker.on(
                'exit', 
                code => {
                    this.workersService.remove(this.workerName);
                    if (code !== 0) {
                        reject(new Error(`Worker stopped with exit code ${code}`))
                    }
                }
            );
          })
    }

    dump(){
        return `This is worker ${this.workerName}`
    }

    kill(){
        this.job.terminate()
    }

}


module.exports = MyWorker;
  