'use strict';

const EventEmitter  =   require('events');
const net           =   require('net');
const fs            =   require('fs');

/**
 * 
 */
class DSServer extends EventEmitter{
    constructor(socketPath) {
        super();
        this.socketPath = socketPath;
        this.makeSureSocketPath();
        this.socket = null;
        this.server = net.createServer(socket => {
            this.socket = socket;
            this.proxyEvents();
        });
        this.server.listen(this.socketPath);
    }
    makeSureSocketPath() {
        if(!fs.existsSync(this.socketPath)) {
            fs.mkdirSync(this.socketPath);
        }
    }
    
    send(msg){
        if(this.socket) {
            return this.socket.write(msg);
        }
        throw new Error('domain socket is not created!please checkout out');
    }
    proxyEvents() {
        const eventsName = ['data', 'end'];
        eventsName.forEach(event => {
            this.socket.on(event, data => {
                this.emit(event, data);
            });
        });
    }

}

module.exports = DSServer;