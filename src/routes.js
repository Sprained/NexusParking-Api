const express = require('express');
const routes = express.Router();

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')

//pre-registro de usuario
routes.post('/register', UserController.register);

//login usuario
routes.post('/session', SessionController.store);

module.exports = routes;