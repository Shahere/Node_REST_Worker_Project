const net = require('net')

class PortExplorer {

    constructor() {
        this.instance;
        this.port = null;
    }

    static getInstance() { //Singleton
        if (!this.instance) {
            this.instance = new PortExplorer();
        }
        return this.instance;
    }

    async getAvailablePort(minPort, maxPort, callback) {
        this.port = Math.floor(Math.random() * (maxPort - minPort + 1) + minPort)
        const server = net.createServer()

        server.once('error', (err) => {
            if(err.code !== 'EADDRINUSE') {
                callback(err)
            }
            //Port is still in use
            server.close()
            //and recheck
            this.getAvailablePort(minPort, maxPort)
        })

        server.once('listening', () => {
            // Port is available return it
            server.close()

            callback(null, this.port)
        })
        server.listen(this.port, '127.0.0.1')
    }

}

module.exports = { PortExplorer };
