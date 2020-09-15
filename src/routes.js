const express = require('express');
const routes = express.Router();

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const ParkingController = require('./app/controllers/ParkingController')
const PaymentController = require('./app/controllers/PaymentController')
const ReportController = require('./app/controllers/ReportController')
const VehiclesController = require('./app/controllers/VehiclesController')

const authMiddleware = require('./app/middleware/auth');
const admMiddleware = require('./app/middleware/authAdmin');

//pre-registro de usuario
routes.post('/register', UserController.register);

//login usuario
routes.post('/session', SessionController.store);

//verificar se usuario ta logado atraves de token jwd
routes.use(authMiddleware);

//rotas do estacionamento
routes.get('/parking', ParkingController.index);
routes.post('/parking', ParkingController.store);

routes.get('/paid', ParkingController.paidIndex);

routes.get('/count', VehiclesController.countVehicles);

//rotas de pagamento
routes.get('/payment/:id', PaymentController.index);
routes.put('/payment/:id', PaymentController.pay);

//rotas de relatorio
routes.post('/report', ReportController.index);

//rota verifiação de senhas
routes.post('/verify', UserController.verify);

//informações usuario
routes.get('/user', UserController.index);

//verificar se usuario tem senha administrativa correta
routes.use(admMiddleware);

//update usuarios
routes.put('/user', UserController.update);

module.exports = routes;