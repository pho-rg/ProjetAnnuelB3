import {pool} from '../../connectionAdminDb'
import {IPersonnelAdmin , rowToIPersonnelAdmin} from "../models/personnelAdmin-model";
import express from "express";
import * as querystring from "node:querystring";
import {rows} from "mssql";
import {RowDataPacket} from "mysql2/promise";

const personnelAdmingetOne = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction ) => {

    try {
        // Obtenir une connexion à partir du pool
        const connection = await pool.getConnection();
        const id =  request.params.id;
        console.log(id);

        // Exécuter une requête SQL
        const [rows] = await connection.execute<RowDataPacket[]>("SELECT * FROM personnel_administratif WHERE id_administratif ="+[id]+"");

        if (rows.length === 0) {
            // Si aucun résultat n'est trouvé, renvoyer une erreur 404
            return response.status(404).json({ message: 'Utilisateur non trouvé' });
        }


        const personnelAdmin : IPersonnelAdmin =  {
            id: rows[0].id,
            nom: rows[0].nom,
            prenom: rows[0].prenom,
            email: rows[0].email,
            date_de_naissance: rows[0].date_de_naissance,
            id_hopital: rows[0].id_hopital,
            id_service: rows[0].id_service,
            mots_de_passe: rows[0].mots_de_passe,
        };

        // Libérer la connexion
        connection.release();
        response.json(personnelAdmin);
    } catch (error) {
        console.error('Erreur lors de la récupération du personnel admin :', error);
        response.status(500).json({ message: 'Erreur serveur' });
    }
};

export {personnelAdmingetOne};