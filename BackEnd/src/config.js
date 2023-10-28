const config = require('dotenv').config();

module.exports = {
    DB_HOST: process.env.DB_HOST || "",
    DATABASE: process.env.DB_NAME || "examen_2",
    DB_USER: process.env.DB_USER || "",
    DB_PASSWORD: process.env.DB_PASSWORD || "",
};



