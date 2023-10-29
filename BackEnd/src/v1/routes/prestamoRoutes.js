const express = require('express');
const router = express.Router();
const prestamoController = require('../../controllers/prestamoController');

router
    .post('/postPrestamo', prestamoController.createNewPrestamo)

    .get('/getAllPrestamos', prestamoController.getAllPrestamos)

    .get('/getPrestamosById/:id_prestamo', prestamoController.getOnePrestamo)

    .put('/updatePrestamoById/:id_prestamo', prestamoController.updateOnePrestamo)

    .delete('/deletePrestamoById/:id_prestamo', prestamoController.deleteOnePrestamo);

module.exports = router;
