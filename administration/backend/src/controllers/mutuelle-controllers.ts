import {pool} from '../../connectionAdminDb'
import express, {json} from "express";
import {RowDataPacket} from "mysql2/promise";

const mutuelleGetAll = async ( request: express.Request,
                               response: express.Response,
                               next: express.NextFunction )=> {
    try {
        // Obtenir une connexion à partir du pool
        const connection = await pool.getConnection();

        // Exécuter une requête SQL
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM mutuelle');
        connection.release();
        //let mutuelles = new Set<IMutuelle>();
        if (rows.length === 0) {
            // Si aucun résultat n'est trouvé, renvoyer une erreur 404
            return response.status(404).json({ message: 'Aucune mutuelle trouvé' });
        }
        // Libérer la connexion

        response.status(200).json(rows);
    } catch (error) {
        console.error('Erreur lors de la récupération des mutuelles:', error);
        response.status(500).json({ message: 'Erreur serveur' });
    }
};

export{mutuelleGetAll};