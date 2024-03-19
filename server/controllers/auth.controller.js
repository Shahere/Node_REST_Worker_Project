const { WorkersService } = require('../use-cases/WorkersService')
const { PortExplorer } = require('../use-cases/PortExplorer')
const jwt = require("jsonwebtoken")

const SECRET_TO_HIDE_ENV_FILE = "YGD*m$$Pb2*45U#9f8DF%@@85X#456e3cyyQr&@B&"

function getToken(req, res, next) {
    try {
        let username = req.body.username;
        let password = req.body.password;

        //TODO verify
        return jwt.sign({"username":username,"password":password},PERSON_API_ACCES_TOKEN_SECRET , {expiresIn: "150m"}) 
    } catch (error) {
        console.error(`>>> ${error} ${error.stack}`)
        res.status(500).send('Internal Server Error')
    }
}

module.exports = {
    getToken
}
