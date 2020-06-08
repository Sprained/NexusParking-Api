require('dotenv/config');

const express = require('express');
const routes = require('./routes');
const cors = require('cors')

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
        this.server.use(express.json());
    }

    routes(){
        this.server.use(routes);
    }
}

module.exports = new App().server;