const database = require('../database/database');
const db = database.getConnection();

const getAllPrestamos = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM prestamo', (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

const getPrestamoById = (id_prestamo) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM prestamo WHERE id_prestamo = ?', [id_prestamo], (err, result) => {
            if (err) reject(err);
            if (result.length === 0) {
                resolve('No existe el préstamo');
            }
            resolve(result[0]);
        });
    });
}

const createNewPrestamo = ({ newPrestamo }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO prestamo SET ?', [newPrestamo], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

const updateOnePrestamo = ({ updatedPrestamo }, id_prestamo) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE prestamo SET ? WHERE id_prestamo = ?', [updatedPrestamo, id_prestamo], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

const deleteOnePrestamo = (id_prestamo) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM prestamo WHERE id_prestamo = ?', [id_prestamo], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

module.exports = {
    getAllPrestamos,
    getPrestamoById,
    createNewPrestamo,
    updateOnePrestamo,
    deleteOnePrestamo
}
