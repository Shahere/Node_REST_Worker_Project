
const MyWorker = require("./MyWorker.model.js");

const premier = new MyWorker({workerName:'premier',scriptName:'worker1'});

const retour1 = premier.start();

