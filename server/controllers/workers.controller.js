const { WorkersService } = require('../use-cases/WorkersService')

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



function addWorker(req, res, next){
  try {
    let instance = WorkersService.getInstance();
    let {workerName,scriptName} = req.body;
    const worker = instance.addWorker({workerName,scriptName});
    res.json(worker);
  } catch (error) {
    console.error(`>>> ${error} ${error.stack}`)
    res.status(500).send('Internal Server Error')
  }
}

function updateWorker(req, res, next) {
  console.log("Update...")
  try {
    let instance = WorkersService.getInstance();
    console.log(req.body)
    let oldKey = req.body.oldWorkerName
    let newKey = req.body.newWorkerName
    instance.update(oldKey, newKey)
    res.json(newKey)
  } catch (error) {
    console.error(`>>> ${error} ${error.stack}`)
    res.status(500).send('Internal Server Error')
  }
}

function deleteWorker(req, res, next) {
  console.log("Delete...")
  try {
    let instance = WorkersService.getInstance();
    instance.terminate(req.body.workerName)
    instance.remove(req.body.workerName)
    res.json(req.body.workerName)
  } catch (error) {
    console.error(`>>> ${error} ${error.stack}`)
    res.status(500).send('Internal Server Error')
  }
}


module.exports = {
  getWorkers,
  addWorker, 
  updateWorker,
  deleteWorker
}
