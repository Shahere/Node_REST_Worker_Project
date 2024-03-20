const { WorkersService } = require('../use-cases/WorkersService')
const { PortExplorer } = require('../use-cases/PortExplorer')
const jwt = require("jsonwebtoken")

function getToken(req, res, next) {
    try {
        let username = req.body.username;
        let password = req.body.password;


        let passwordauth = process.env.PASSWORDAUTH
        let usernameauth = process.env.USERNAMEAUTH

        if (username == usernameauth && password == passwordauth) {
            let token = jwt.sign({ "username": username, "password": password }, process.env.SECRET_KEY, { expiresIn: "150m" })
            res.json(token)
        } else {
            console.log("False conditions")
            res.status(400).send("Can't authentificate to server")
        }
    } catch (error) {
        console.error(`>>> ${error} ${error.stack}`)
        res.status(500).send('Internal Server Error')
    }
}

module.exports = {
    getToken
}
