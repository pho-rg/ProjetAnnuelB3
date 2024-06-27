import {pool} from '../../connectionAdminDb'
import {IPersonnelAdmin , rowToIPersonnelAdmin} from "../models/personnelAdmin-model";
import express from "express";
import {RowDataPacket} from "mysql2/promise";

const personnelAdmingetOne = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction ) => {

    try {
        // Obtenir une connexion à partir du pool
        const connection = await pool.getConnection();
        const email =  request.params.email;

        // Exécuter une requête SQL
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM personnel_administratif LEFT JOIN hopital ON personnel_administratif.id_hopital = hopital.id_hopital LEFT JOIN service ON personnel_administratif.id_service = service.id_service WHERE email = ?',[email]);
        connection.release(); // Libérer la connexion
        if (rows.length === 0) {
            // Si aucun résultat n'est trouvé, renvoyer une erreur 404
            return response.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        const personnelAdmin = rowToIPersonnelAdmin(rows[0]);

        response.json(personnelAdmin);
    } catch (error) {
        console.error('Erreur lors de la récupération du personnel admin :', error);
        response.status(500).json({ message: 'Erreur serveur' });
    }
};

export {personnelAdmingetOne};