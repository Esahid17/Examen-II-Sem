const express = require('express');
const router = express.Router();
const clienteController = require('../../controllers/clienteController');

router
    .post('/postCliente', clienteController.createNewCliente)

    .get('/getAllClientes', clienteController.getAllClientes)

    .get('/getClienteById/:id_cliente', clienteController.getOneCliente)

    .get('/getAllPrestamosByIdCliente/:id_cliente', clienteController.getAllPrestamosByIdCliente)

    .put('/updateClienteById/:id_cliente', clienteController.updateOneCliente)

    .delete('/deleteClienteById/:id_cliente', clienteController.deleteOneCliente);

module.exports = router;

