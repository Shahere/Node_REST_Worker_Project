const express = require('express');
var cors = require('cors')
const app = express();

app.use(cors())


app.use(express.static('public'))

app.use(express.json());   
app.use(express.urlencoded({ extended: true })); 

const workersRouter = require('./routes/workers.route');
const authRouter = require('./routes/auth.route')


const WorkersAPIBaseURL = '/api/v1/workers';
const AuthentificationAPIBaseURL = '/api/v1/auth'
const port = 3000;


app.use(WorkersAPIBaseURL, workersRouter);
app.use(AuthentificationAPIBaseURL, authRouter)

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`)
})
