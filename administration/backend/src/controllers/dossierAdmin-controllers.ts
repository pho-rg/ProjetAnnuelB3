import {pool} from '../../connectionAdminDb'
import {IDossierAdmin, rowToIDossierAdmin} from "../models/dossierAdmin-model";
import express from "express";
import {RowDataPacket} from "mysql2/promise";
import {rowToIMutuelle} from "../models/mutuelleAdmin-model";

/**Verification si un dossier admin existe*/
const dossierAdminExists = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction) => {

    try {
        /**Creer une connexion avec la base de données SQL*/
        const connection = await pool.getConnection();

        /**Recuperation des données dans les parametres de la requete*/
        const id = request.params.id;

        /**Execute une requete sur la base de données SQL*/
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT CASE WHEN EXISTS (SELECT 1 FROM dossier_administratif WHERE num_secu = ?) THEN 1 ELSE 2 END AS result', [id]);

        /**Fermeture de la connexion avec la base de données SQL*/
        connection.release();

        if (rows[0].result === 2) {

            /** Renvoyer une reponse not found*/
            return response.status(404).json({"exists": false, message: 'Dossier administratif inexistant'});
        }

        /**Renvoyer une réponse de succès*/
        return response.status(200).json({"exists": true, message: 'Dossier administratif existant'});
    } catch (error) {

        /**Renvoyer une réponse  d'echec*/
        response.status(500).json({message: 'Erreur serveur'});
    }
};

/**Recherche des dossiers admins qui correspondent aux parametres*/
const dossierAdminSearch = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction) => {

    try {
        let dossierAdmins : IDossierAdmin[] = [];

        /**Creer une connexion avec la base de données SQL*/
        const connection = await pool.getConnection();

        /**Recuperation des données dans les parametres de la requete*/
        const nom = request.query.nom;
        const prenom = request.query.prenom;

        /**Execute une requete sur la base de données SQL*/
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT num_secu FROM dossier_administratif WHERE nom LIKE ? AND prenom LIKE ?', [`%${nom}%`, `%${prenom}%`]);

        /**Fermeture de la connexion avec la base de données SQL*/
        connection.release();

        if (rows.length == 0) {

            /** Renvoyer une reponse not found*/
            return response.status(404).json({message: 'Aucun dossier administratif trouvé'});
        }

        /**Traitement des donnees de retour de la requete*/
        for(let i=0;i<rows.length;i++){
            let dossierAdmin = rowToIDossierAdmin(rows[i]);
            dossierAdmins.push(dossierAdmin);
        }

        /**Renvoyer une réponse de succès*/
        return response.status(200).json(rows);
    } catch (error) {

        /**Renvoyer une réponse  d'echec*/
        response.status(500).json({message: 'Erreur serveur'});
    }
};

/**Recherche d'un dossier admins*/
const dossierAdmingetOne = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction) => {

    try {
        /**Creer une connexion avec la base de données SQL*/
        const connection = await pool.getConnection();

        /**Recuperation des données dans les parametres de la requete*/
        const id = request.params.id;

        /**Execute une requete sur la base de données SQL*/
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT dossier_administratif.*, mutuelle.nom_mutuelle FROM dossier_administratif LEFT JOIN mutuelle ON dossier_administratif.id_mutuelle = mutuelle.id_mutuelle WHERE num_secu = ?', [id]);

        /**Fermeture de la connexion avec la base de données SQL*/
        connection.release();

        if (rows.length === 0) {

            /** Renvoyer une reponse not found*/
            return response.status(404).json({message: 'Dossier administratif non trouvé'});
        }

        /**Renvoyer une réponse de succès*/
        const dossierAdmin = rowToIDossierAdmin(rows[0]);
        return response.status(200).json(dossierAdmin);
    } catch (error) {

        /**Renvoyer une réponse  d'echec*/
        response.status(500).json({message: 'Erreur serveur'});
    }
};

/**Post d'un dossier admin*/
const dossierAdminPost = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction) => {

    try {
        /**Creer une connexion avec la base de données SQL*/
        const connection = await pool.getConnection();

        /**Récupérer les données de la requête*/
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

        /** Exécuter une requête SQL pour insérer les données*/
        const [result] = await connection.execute('INSERT INTO dossier_administratif (num_secu, nom, prenom, sexe, date_naissance, telephone, email, adresse, remarques, id_hopital, id_mutuelle) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [num_secu, nom, prenom, sexe, date_naissance, telephone, email, adresse, remarques, id_hopital, id_mutuelle]);

        /**Fermeture de la connexion avec la base de données SQL*/
        connection.release();

        /**Renvoyer une réponse de succès*/
        response.status(201).json({message: 'Dossier administratif créé avec succès', result});
    } catch (error) {

        /**Renvoyer une réponse  d'echec*/
        response.status(500).json({message: 'Erreur serveur'});
    }
};

/**Patch d'un dossier admin*/
const dossierAdminPatch = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction) => {
    // Récupérer les données de la requête
    try {

        /**Creer une connexion avec la base de données SQL*/
        const connection = await pool.getConnection();

        /**Récupérer les données de la requête*/
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

        /** Exécuter une requête SQL pour mettre à jour les données*/
        const [result] = await connection.execute('UPDATE dossier_administratif SET num_secu = ?, nom = ?, prenom = ?, sexe = ?, date_naissance = ?, telephone = ?, email = ?, adresse = ?, remarques = ?, id_hopital = ?, id_mutuelle = ? WHERE num_secu = ?',
            [num_secu, nom, prenom, sexe, date_naissance, telephone, email, adresse, remarques, id_hopital, id_mutuelle, id]);

        /**Fermeture de la connexion avec la base de données SQL*/
        connection.release();

        /**Renvoyer une réponse de succès*/
        response.status(200).json({message: 'Dossier administratif mis à jour avec succès'});
    } catch (error) {

        /**Renvoyer une réponse  d'echec*/
        response.status(500).json({message: 'Erreur lors de la mise à jour du dossier administratif'});

    }
};

export {dossierAdminExists, dossierAdmingetOne, dossierAdminPost, dossierAdminPatch, dossierAdminSearch};