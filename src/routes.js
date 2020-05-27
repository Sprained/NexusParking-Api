const express = require('express');
const routes = express.Router();

const UserController = require('./app/controllers/UserController')

//pre-registro de usuario
routes.post('/register', UserController.register);

module.exports = routes;