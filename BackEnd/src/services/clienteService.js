const database = require('../database/database');
const db = database.getConnection();

const getAllClientes = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM cliente', (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

const getClienteById = (id_cliente) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM cliente WHERE id_cliente = ?', [id_cliente], (err, result) => {
            if (err) reject(err);
            if (result.length === 0) {
                resolve('No existe el cliente');
            }
            resolve(result[0]);
        });
    });
}

const createNewCliente = ({ newCliente }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO cliente SET ?', [newCliente], (err, result) => {
            if (err) reject(err);
            resolve({ id_cliente: result.id_cliente, ...newCliente });
        });
    });
}

const updateOneCliente = ({ updatedCliente }, id_cliente) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE cliente SET ? WHERE id_cliente = ?', [updatedCliente, id_cliente], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

const deleteOneCliente = (id_cliente) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM cliente WHERE id_cliente = ?', [id_cliente], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

const getAllPrestamosByIdCliente = (id_cliente) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM prestamo WHERE id_cliente = ?', [id_cliente], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

module.exports = {
    getAllClientes,
    getClienteById,
    createNewCliente,
    updateOneCliente,
    deleteOneCliente,
    getAllPrestamosByIdCliente
}
