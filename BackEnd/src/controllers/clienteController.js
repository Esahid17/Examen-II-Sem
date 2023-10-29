const clienteService = require('../services/clienteService');

const getAllClientes = async (req, res) => {
    try {
        const allClientes = await clienteService.getAllClientes();
        console.log(allClientes);
        res.json(allClientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los clientes' });
    }
}

const getOneCliente = async (req, res) => {
    try {
        const cliente = await clienteService.getClienteById(req.params.id_cliente);
        console.log(cliente);
        res.json(cliente);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el cliente' });
    }
}

const createNewCliente = async (req, res) => {
    try {
        const { body } = req;

        if (!body.nombre || !body.rfc || !body.edad || !body.fecha_alta || !body.telefono || !body.correo) {
            return res.status(400).json({ error: 'Datos incompletos' });
        }

        const newCliente = {
            nombre: body.nombre,
            rfc: body.rfc,
            edad: body.edad,
            fecha_alta: body.fecha_alta,
            telefono: body.telefono,
            correo: body.correo
        };

        await clienteService.createNewCliente({ newCliente });
        res.status(201).json(newCliente);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el cliente' });
    }
}

const updateOneCliente = async (req, res) => {
    try {
        const { body } = req;

        if (!body.nombre || !body.rfc || !body.edad || !body.fecha_alta || !body.telefono || !body.correo) {
            return res.status(400).json({ error: 'Datos incompletos' });
        }

        const updatedCliente = {
            nombre: body.nombre,
            rfc: body.rfc,
            edad: body.edad,
            fecha_alta: body.fecha_alta,
            telefono: body.telefono,
            correo: body.correo
        };

        await clienteService.updateOneCliente({ updatedCliente }, req.params.id_cliente);
        res.json({ message: 'Cliente actualizado exitosamente', updatedCliente });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el cliente' });
    }
}

const deleteOneCliente = async (req, res) => {
    try {
        await clienteService.deleteOneCliente(req.params.id_cliente);
        res.json({ message: 'Cliente eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el cliente' });
    }
}

const getAllPrestamosByIdCliente = async (req, res) => {
    try {
        const prestamos = await clienteService.getAllPrestamosByIdCliente(req.params.id_cliente);
        console.log(prestamos);
        res.json(prestamos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los préstamos del cliente' });
    }
}

module.exports = {
    getAllClientes,
    getOneCliente,
    createNewCliente,
    updateOneCliente,
    deleteOneCliente,
    getAllPrestamosByIdCliente
};
