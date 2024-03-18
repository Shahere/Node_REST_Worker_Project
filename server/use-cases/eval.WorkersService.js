const { WorkersService } = require('./WorkersService')


const WSS  =new WorkersService();

WSS.addWorker({workerName:'Jack',scriptName:'worker1'});

