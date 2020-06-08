const express = require('express');
const routes = express.Router();

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const ParkingController = require('./app/controllers/ParkingController')

const authMiddleware = require('./app/middleware/auth');

//pre-registro de usuario
routes.post('/register', UserController.register);

//login usuario
routes.post('/session', SessionController.store);

//verificar se usuario ta logado atraves de token jwd
routes.use(authMiddleware);

//rotas do estacionamento
routes.get('/parking', ParkingController.index);
routes.post('/parking', ParkingController.store);

module.exports = routes;