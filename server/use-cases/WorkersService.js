
const MyWorker = require("../models/MyWorker.model.js");




class WorkersService extends Map{

	constructor(){
		super();
		this.instance;
	}

	static getInstance(){ //Singleton
		if(!this.instance){
			this.instance = new WorkersService();
		}
		return this.instance;
	}
	
	addWorker({workerName,scriptName}){
  		let newWorker;
  		try{
			newWorker = new MyWorker({workerName,scriptName,workersService:this});
			newWorker.start();
		} catch (error){
			throw Error(`cannot create Worker ${error} ${error.stack}`);
		}
		return newWorker.dump();
	}

	getWorkers(){
		return Array.from(this);
	}

	touch(key,value){
		console.log(` workersService touch(${key},${value})`)
		this.set(key,value);
		this.forEach((value,key,map)=>{console.log(`touch --- MAP[${key}] = ${value}`)})
	}


	remove(key){
		console.log(` workersService remove(${key})`)
		this.delete(key);
		this.forEach((value,key,map)=>{console.log(`remove --- MAP[${key}] = ${value}`)})
	}

}

module.exports = { WorkersService };
