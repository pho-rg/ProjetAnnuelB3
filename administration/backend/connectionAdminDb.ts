import mysql from 'mysql2/promise';
const config = require('./config');

const pool = mysql.createPool({
    host: config.server,
    user: config.user,
    password: config.password,
    database: config.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    port: config.port
});

export {pool};