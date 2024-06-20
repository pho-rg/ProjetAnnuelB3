import express, { Request, Response } from 'express';
import mysql from 'mysql2/promise';

//const PORT = process.env.PORT || 3000;

const pool = mysql.createPool({
    host: 'localhost',
    user: 'adminMysql',
    password: '',  // Remplacez par votre mot de passe MariaDB
    database: 'admin',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    port: 8889
});

// Démarrer le serveur
//app.listen(PORT, () => {
//    console.log(`Serveur démarré sur le port ${PORT}`);
//});

export {pool};