const sequelize = require('sequelize');

const databaseConfig = require('../config/database');

const Companies = require('../app/models/Companies');
const Vehicles = require('../app/models/Vehicles');

const models = [Companies, Vehicles];

class Database{
    constructor(){
        this.init();
    }

    init(){
        this.connection = new sequelize(databaseConfig);

        models
        .map(model => model.init(this.connection))
        .map(model => model.associate && model.associate(this.connection.models));
    }
}

module.exports = new Database();