import {pool} from '../../connectionAdminDb'
import {IPersonnelAdmin , rowToIPersonnelAdmin} from "../models/personnelAdmin-model";
import express from "express";
import {RowDataPacket} from "mysql2/promise";

/**Rechecher d'un personnel admin*/
const personnelAdmingetOne = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction ) => {

    try {
        /** Obtenir une connexion à partir du pool*/
        const connection = await pool.getConnection();
        const email =  request.params.email;

        /** Exécuter une requête SQL*/
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM personnel_administratif LEFT JOIN hopital ON personnel_administratif.id_hopital = hopital.id_hopital LEFT JOIN service ON personnel_administratif.id_service = service.id_service WHERE email = ?',[email]);

        /**Fermeture de la connexion avec la base de données SQL*/
        connection.release();

        /** Renvoyer une reponse not found*/
        if (rows.length === 0) {
            // Si aucun résultat n'est trouvé, renvoyer une erreur 404
            return response.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        /**Traitement des donnees de retour de la requete*/
        const personnelAdmin = rowToIPersonnelAdmin(rows[0]);

        /**Renvoyer une réponse de succès*/
        response.status(200).json(personnelAdmin);
    } catch (error) {

        /**Renvoyer une réponse  d'echec*/
        response.status(500).json({ message: 'Erreur serveur' });
    }
};

export {personnelAdmingetOne};