import {pool} from '../../connectionAdminDb'
import {IDossierAdmin, rowToIDossierAdmin} from "../models/dossierAdmin-model";
import express from "express";
import {RowDataPacket} from "mysql2/promise";

const dossierAdminExist = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction) => {

    try {
        // Obtenir une connexion à partir du pool
        const connection = await pool.getConnection();
        const id = request.params.id;

        // Exécuter une requête SQL
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT CASE WHEN EXISTS (SELECT 1 FROM dossier_administratif WHERE num_secu = ?) THEN 1 ELSE 2 END AS result', [id]);

        if (rows[0].result === 2) {
            // Si aucun résultat n'est trouvé, renvoyer une erreur 404
            return response.status(404).json({"exists": false, message: 'Dossier administratif inexistant'});
        }

        // Libérer la connexion
        connection.release();
        return response.status(200).json({"exists": true, message: 'Dossier administratif existant'});
    } catch (error) {
        console.error('Erreur lors de la récupération du dossier administratif :', error);
        response.status(500).json({message: 'Erreur serveur'});
    }
};

const dossierAdminSearch = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction) => {

    try {
        // Obtenir une connexion à partir du pool
        const connection = await pool.getConnection();
        const nom = request.query.nom;
        const prenom = request.query.prenom;
        console.log(nom);
        console.log(prenom);

        // Exécuter une requête SQL
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT num_secu FROM dossier_administratif WHERE nom LIKE ? AND prenom LIKE ?', [`%${nom}%`,`%${prenom}%`]);

        if (rows.length == 0) {
            // Si aucun résultat n'est trouvé, renvoyer une erreur 404
            return response.status(404).json({message:'Aucun dossier administratif trouvé'});
        }
        // Libérer la connexion
        connection.release();
        return response.status(200).json(rows);
    } catch (error) {
        console.error('Erreur lors de la récupération du dossier administratif :', error);
        response.status(500).json({message: 'Erreur serveur'});
    }
};

const dossierAdmingetOne = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction) => {

    try {
        // Obtenir une connexion à partir du pool
        const connection = await pool.getConnection();
        const id = request.params.id;

        // Exécuter une requête SQL
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM dossier_administratif LEFT JOIN mutuelle ON dossier_administratif.id_mutuelle = mutuelle.id_mutuelle WHERE num_secu = ?', [id]);

        if (rows.length === 0) {
            // Si aucun résultat n'est trouvé, renvoyer une erreur 404
            return response.status(404).json({message: 'Dossier administratif non trouvé'});
        }
        const dossierAdmin = rowToIDossierAdmin(rows[0]);

        // Libérer la connexion
        connection.release();
        return response.status(200).json(dossierAdmin);
    } catch (error) {
        console.error('Erreur lors de la récupération du dossier administratif :', error);
        response.status(500).json({message: 'Erreur serveur'});
    }
};

const dossierAdminPost = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction) => {

    try {
        // Obtenir une connexion à partir du pool
        const connection = await pool.getConnection();

        // Récupérer les données de la requête
        const {
            num_secu,
            nom,
            prenom,
            sexe,
            date_naissance,
            telephone,
            email,
            adresse,
            remarques,
            id_hopital,
            id_mutuelle
        } = request.body;

        // Exécuter une requête SQL pour insérer les données
        const [result] = await connection.execute('INSERT INTO dossier_administratif (num_secu, nom, prenom, sexe, date_naissance, telephone, email, adresse, remarques, id_hopital, id_mutuelle) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [num_secu, nom, prenom, sexe, date_naissance, telephone, email, adresse, remarques, id_hopital, id_mutuelle]);

        // Libérer la connexion
        connection.release();

        // Renvoyer une réponse de succès
        response.status(201).json({message: 'Dossier administratif créé avec succès'});
    } catch (error) {
        console.error('Erreur lors de la création du dossier administratif :', error);
        response.status(500).json({message: 'Erreur serveur'});
    }
};

const dossierAdminPatch = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction) => {
    // Récupérer les données de la requête
    const {
        num_secu,
        nom,
        prenom,
        sexe,
        date_naissance,
        telephone,
        email,
        adresse,
        remarques,
        id_hopital,
        id_mutuelle
    } = request.body;
    const id = request.params.id; //

    try {
        const connection = await pool.getConnection();
        // Exécuter une requête SQL pour mettre à jour les données
        const [result] = await connection.execute('UPDATE dossier_administratif SET num_secu = ?, nom = ?, prenom = ?, sexe = ?, date_naissance = ?, telephone = ?, email = ?, adresse = ?, remarques = ?, id_hopital = ?, id_mutuelle = ? WHERE num_secu = ?',
            [num_secu, nom, prenom, sexe, date_naissance, telephone, email, adresse, remarques, id_hopital, id_mutuelle, id]);

        connection.release();
        console.log(`Dossier administratif avec ID: ${id} a été mis à jour`);
        response.status(200).json({message: 'Dossier administratif mis à jour avec succès'});
    } catch (error) {
        console.error('Erreur lors de la mise à jour du dossier administratif:');
        response.status(500).json({message: 'Erreur lors de la mise à jour du dossier administratif'});

    }
};

export {dossierAdminExist, dossierAdmingetOne, dossierAdminPost, dossierAdminPatch,dossierAdminSearch};