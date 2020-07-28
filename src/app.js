require('dotenv/config');

const express = require('express');
const routes = require('./routes');
const cors = require('cors')
const path = require('path');

require('./database')

const Queue = require('./lib/Queue');

class App {
    constructor(){
        this.server = express();

        this.middlewares();
        this.routes();
        Queue.processQueue();
    }

    middlewares(){
        this.server.use(cors());
        this.server.use(
            '/files',
            express.static(path.resolve(__dirname, '..', 'temp'))
        )
        this.server.use(express.json());
    }

    routes(){
        this.server.use(routes);
    }
}

module.exports = new App().server;