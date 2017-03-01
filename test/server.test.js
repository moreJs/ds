'use strict';

const DSServer = require('../index.js').DSServer;
const path = require('path');

class Server extends DSServer{
    constructor(path) {
        super(path);
    }
}

const s = new Server(path.join(__dirname, './mysock'));