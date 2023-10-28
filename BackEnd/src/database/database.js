const mysql = require('mysql');
const config = require('../config');

const db = mysql.createConnection({
    host: config.DB_HOST,
    database: config.DATABASE,
    user: config.DB_USER,
    password: config.DB_PASSWORD
});

const getConnection = () => {
    return db;
}

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

module.exports = {
    getConnection
}
