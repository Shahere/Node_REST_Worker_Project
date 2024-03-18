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

function deleteWorker(req, res, next) {
  try {
    
  } catch (error) {
    
  }
}

function updateWorker(req, res, next) {
  
}


module.exports = {
  getWorkers,
  addWorker
}
