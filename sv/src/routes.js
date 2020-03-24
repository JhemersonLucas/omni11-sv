const express = require('express');
const conn = require('./database/conn');
const CasoController = require('./constrollers/CasoController')
const OngController = require('./constrollers/OngController')
const ProfileController = require('./constrollers/ProfileController')
const SessionController = require('./constrollers/SessionController')
const routes = express.Router();

routes.post('/sessions', SessionController.create)
routes.post('/ongs', OngController.create);
routes.get('/ongs', OngController.index);

routes.post('/casos', CasoController.create);
routes.get('/casos', CasoController.index);
routes.delete('/casos/:id', CasoController.delete);

routes.get('/profile', ProfileController.index);

module.exports = routes;