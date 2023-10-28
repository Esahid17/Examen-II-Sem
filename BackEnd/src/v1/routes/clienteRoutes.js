const express = require('express');
const router = express.Router();
const clienteController = require('../../controllers/clienteController');

router
    .get('/getAllClientes', clienteController.getAllClientes)

    .get('/getClienteById/:id_cliente', clienteController.getOneCliente)

    .post('/postCliente', clienteController.createNewCliente)

    .put('/updateClienteById/:id_cliente', clienteController.updateOneCliente)

    .delete('/deleteClienteById/:id_cliente', clienteController.deleteOneCliente)

    .get('/getAllPrestamosByIdCliente/:id_cliente', clienteController.getAllPrestamosByIdCliente);

module.exports = router;

