const sequelize = require('sequelize');

const databaseConfig = require('../config/database');

const Companies = require('../app/models/Companies');

const models = [Companies];

class Database{
    constructor(){
        this.init();
    }

    init(){
        this.connection = new sequelize(databaseConfig);

        models
        .map(model => model.init(this.connection));
    }
}

module.exports = new Database();