'use strict';

const EventEmitter  =   require('events');
const net           =   require('net');

class DSClient extends EventEmitter{
    constructor(socketPath) {
        super();
        this.socketPath = socketPath;
        this.clent = net.connect({path: this.socketPath});
        this.proxyEvents();
    }
    send(msg) {
        this.clent.write(msg);
    }
    proxyEvents() {
        const events = ['data', 'end'];
        events.forEach(evnet => {
            this.client.on(event, data => {
                this.emit(event, data);
            });
        });
    }
}

module.exports = DSClient;