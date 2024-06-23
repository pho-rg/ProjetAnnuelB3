import express, { Request, Response } from 'express';
import mysql from 'mysql2/promise';

//const PORT = process.env.PORT || 3000;

const pool = mysql.createPool({
    host: 'localhost',
    user: 'adminMysql', // Remplacez par votre user
    password: '',  // Remplacez par votre mot de passe
    database: 'admin',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    //port: 8889 // Commentez la ligne pour le port par défaut
});

// Démarrer le serveur
//app.listen(PORT, () => {
//    console.log(`Serveur démarré sur le port ${PORT}`);
//});

export {pool};