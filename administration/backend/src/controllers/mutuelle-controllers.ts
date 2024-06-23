import {pool} from '../../connectionAdminDb'
import {IMutuelle , rowToIMutuelle} from "../models/mutuelle-model";
import express, {json} from "express";
import * as querystring from "node:querystring";
import {rows} from "mssql";
import {RowDataPacket} from "mysql2/promise";
import {rowToIDossierAdmin} from "../models/dossierAdmin-model";

const mutuelleGetAll = async ( request: express.Request,
                               response: express.Response,
                               next: express.NextFunction )=> {
    try {
        // Obtenir une connexion à partir du pool
        const connection = await pool.getConnection();

        // Exécuter une requête SQL
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM mutuelle');
        //let mutuelles = new Set<IMutuelle>();
        if (rows.length === 0) {
            // Si aucun résultat n'est trouvé, renvoyer une erreur 404
            return response.status(404).json({ message: 'Aucune mutuelle trouvé' });
        }
        //for (let i = 0; i < rows.length; i++) {
        //   mutuelles.add(rowToIMutuelle(rows[i]));
        //    console.log(mutuelles);
        //}
        // Libérer la connexion
        connection.release();
        response.json(rows);
    } catch (error) {
        console.error('Erreur lors de la récupération des mutuelles:', error);
        response.status(500).json({ message: 'Erreur serveur' });
    }
};

export{mutuelleGetAll};