const prestamoService = require('../services/prestamoService');

const getAllPrestamos = async (req, res) => {
    try {
        const allPrestamos = await prestamoService.getAllPrestamos();
        console.log(allPrestamos);
        res.json(allPrestamos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los prestamos' });
    }
}

const getOnePrestamo = async (req, res) => {
    try {
        const prestamo = await prestamoService.getPrestamoById(req.params.id_prestamo);
        console.log(prestamo);
        res.json(prestamo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el prestamo' });
    }
}

const createNewPrestamo = async (req, res) => {
    try {
        const { body } = req;

        if (!body.monto || !body.plazo_meses || !body.interes) {
            return res.status(400).json({ error: 'Datos incompletos' });
        }

        const newPrestamo = {
            id_cliente: req.params.id_cliente,
            monto: body.monto,
            plazo_meses: body.plazo_meses,
            interes: body.interes
        };

        await prestamoService.createNewPrestamo({ newPrestamo });
        res.status(201).json({ message: 'Préstamo creado exitosamente', newPrestamo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el préstamo' });
    }
}

const updateOnePrestamo = async (req, res) => {
    try {
        const { body } = req;

        if (!body.monto || !body.plazo_meses || !body.interes) {
            return res.status(400).json({ error: 'Datos incompletos' });
        }

        const updatedPrestamo = {
            monto: body.monto,
            plazo_meses: body.plazo_meses,
            interes: body.interes,
        };

        await prestamoService.updateOnePrestamo({ updatedPrestamo }, req.params.id_prestamo);
        res.json({ message: 'Préstamo actualizado exitosamente', updatedPrestamo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el préstamo del cliente' });
    }
}

const deleteOnePrestamo = async (req, res) => {
    try {
        await prestamoService.deleteOnePrestamo(req.params.id_prestamo);
        res.json({ message: 'Prestamo eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el préstamo del cliente' });
    }
}

module.exports = {
    getAllPrestamos,
    getOnePrestamo,
    createNewPrestamo,
    updateOnePrestamo,
    deleteOnePrestamo
}
