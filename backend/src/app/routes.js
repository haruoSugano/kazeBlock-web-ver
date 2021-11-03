const express = require('express');

const routes = express.Router();
const User = require('./controllers/userController');
const Pacient = require('./controllers/pacientController');
const Vaccine = require('./controllers/vaccineController');

// Usuário:
routes.get('/api/user', User.index);
routes.get('/api/user-details/:_id', User.details);
routes.post('/api/user', User.create);
routes.delete('/api/user/:_id', User.delete);
routes.put('/api/user', User.update);
routes.post('/api/user/login', User.authenticate);
routes.get('/api/user/checkToken', User.checkToken);
routes.get('/api/user/destroyerToken', User.destroyerToken);
routes.post('/api/user/forgotPassword', User.forgotPassword);
routes.post('/api/user/resetPassword', User.resetPassword);

//Paciente:
routes.get('/api/pacient', Pacient.index);
routes.get('/api/pacient-details/:_id', Pacient.details);
routes.post('/api/pacient', Pacient.create);
routes.delete('/api/pacient/:_id', Pacient.delete);
routes.put('/api/pacient', Pacient.update);

//Vaccine:
routes.get('/api/vaccine', Vaccine.index);
routes.get('/api/vaccine-details/:_id', Vaccine.details);
routes.post('/api/vaccine', Vaccine.create);
routes.delete('/api/vaccine/:_id', Vaccine.delete);
routes.put('/api/vaccine', Vaccine.update);

module.exports = routes;
