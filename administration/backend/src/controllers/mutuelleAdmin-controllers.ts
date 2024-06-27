import {pool} from '../../connectionAdminDb'
import express, {json} from "express";
import {RowDataPacket} from "mysql2/promise";
import {IMutuelle, rowToIMutuelle} from "../models/mutuelleAdmin-model"

const mutuelleGetAll = async ( request: express.Request,
                               response: express.Response,
                               next: express.NextFunction )=> {
    try {
        let mutuelles : IMutuelle[] = [];

        /** Obtenir une connexion à partir du pool*/
        const connection = await pool.getConnection();

        /** Exécuter une requête SQL*/
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM mutuelle');

        /**Fermeture de la connexion avec la base de données SQL*/
        connection.release();

        /** Renvoyer une reponse not found*/
        if (rows.length === 0) {
            return response.status(404).json({ message: 'Aucune mutuelle trouvé' });
        }

        /**Traitement des donnees de retour de la requete*/
        for(let i=0;i<rows.length;i++){
            let mutuelle = rowToIMutuelle(rows[i]);
            mutuelles.push(mutuelle);
        }

        /**Renvoyer une réponse de succès*/
        response.status(200).json(mutuelles);
    } catch (error) {

        /**Renvoyer une réponse  d'echec*/
        response.status(500).json({ message: 'Erreur serveur' });
    }
};

export{mutuelleGetAll};