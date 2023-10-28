const express = require('express');
const router = express.Router();
const prestamoController = require('../../controllers/prestamoController');

router
    .get('/getAllPrestamos', prestamoController.getAllPrestamos)

    .get('/getPrestamosById/:id_prestamo', prestamoController.getOnePrestamo)

    .post('/postPrestamo', prestamoController.createNewPrestamo)

    .put('/updatePrestamoById/:id_prestamo', prestamoController.updateOnePrestamo)

    .delete('/deletePrestamoById/:id_prestamo', prestamoController.deleteOnePrestamo);

module.exports = router;
