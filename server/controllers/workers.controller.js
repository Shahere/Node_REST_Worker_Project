const { WorkersService } = require('../use-cases/WorkersService')
const { PortExplorer } = require('../use-cases/PortExplorer')

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
    let port = null;
    let portInstance = PortExplorer.getInstance()
    await portInstance.getAvailablePort(3000, 9000, (err, portA) => {
      if (err) {
        console.error('Error findong a port : ' + err)
      }
      port = portA
    });

    let instance = WorkersService.getInstance();
    let { workerName, scriptName } = req.body;
    const worker = await instance.addWorker({ workerName, scriptName, port });
    res.json(port);
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
  getWorker,
  addWorker,
  updateWorker,
  deleteWorker
}
