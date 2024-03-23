const { WorkersService } = require('../use-cases/WorkersService')
const { PortExplorer } = require('../use-cases/PortExplorer')
const {text} = require("express");
const {createServer} = require("net");

function getWorkers(req, res, next) {
  try {
    let instance = WorkersService.getInstance();
    const workers = instance.getWorkers();
    res.json(workers)
  } catch (error) {
    console.error(`>>> ${error} ${error.stack}`)
    res.status(404).send(`Ressource Not Found`)
  }
}

async function getWorker(req, res, next) {
  try {
    let instance = WorkersService.getInstance();
    const worker = await instance.getWorker(req.params.workerName)
    if (!worker) {
      res.sendStatus(404)
    } else {
      res.json(worker);
    }
  } catch (error) {
    console.error(`>>> ${error} ${error.stack}`)
    res.status(404).send(`Ressource Not Found`)
  }
}

async function addWorker(req, res, next) {
  try {
    let instance = WorkersService.getInstance();
    let {workerName,scriptName} = req.body;
    const worker = await instance.addWorker({workerName,scriptName});
    res.json(workerName);
  } catch (error) {
    console.error(`>>> ${error} ${error.stack}`)
    res.status(500).send('Internal Server Error')
  }
}


async function updateWorker(req, res, next) {
  console.log("Update..."+req.params["id"])
  let id = req.params["id"];
  try {
    let instance = WorkersService.getInstance();
    console.log(req.body)
    let action = req.body.action
    if(action === "start"){
        console.log("Start worker "+id)
        let port = null;
        let portInstance = PortExplorer.getInstance()
        await portInstance.getAvailablePort(3000, 9000, (err, portA) => {
          if(err) {
            console.error('Error findong a port : '+err)
          }
          port = portA
        });
        await instance.startWorker(id, port)
        res.json(port)
    }else {
      let newKey = req.body.newWorkerName
      instance.update(id, newKey)
      res.json(newKey)
    }
  } catch (error) {
    console.error(`>>> ${error} ${error.stack}`)
    res.status(500).send('Internal Server Error')
  }
}

function deleteWorker(req, res, next) {
  let id = req.params["id"];
  console.log("Delete... "+id)
  try {
    let instance = WorkersService.getInstance();
    instance.terminate(id)
    instance.remove(id)
    res.json(id)
  } catch (error) {
    console.error(`>>> ${error} ${error.stack}`)
    res.status(500).send('Internal Server Error')
  }
}


module.exports = {
  getWorkers,
  getWorker,
  addWorker,
  updateWorker,
  deleteWorker
}
