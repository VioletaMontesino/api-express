const express = require ('express');
const route = express.Router();
const services = require('../services/render');
const controller = require('../controller/controller');


// Conexión a las vistas
route.get('/', services.users);
route.get('/add-user', services.add_user); 
route.get('/update-user', services.update_user);

// Conexión al controlador
route.get('/users', controller.find);
route.get('/users/:id', controller.findOne);
route.post('/users', controller.create);
route.put('/users/:id', controller.update);
route.delete('/users/:id', controller.delete);


module.exports = route;