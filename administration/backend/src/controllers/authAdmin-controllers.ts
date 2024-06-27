import express from "express";
import {RowDataPacket} from "mysql2/promise";
import {pool} from "../../connectionAdminDb";
import bcrypt from "bcryptjs";
import {sign} from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();


const userConnexion = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction) => {

    try {
        const connection = await pool.getConnection();
        const email = request.body.email;
        const mots_de_passe = request.body.mots_de_passe;

        // Exécuter une requête SQL
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT mots_de_passe FROM personnel_administratif WHERE email = ?', [email]);
        connection.release();
        const mots_de_pass_hash = rows[0].mots_de_passe;
        if (rows.length === 0) {
            // Si aucun résultat n'est trouvé, renvoyer une erreur 404
            return response.status(404).json({message: 'Serveur introuvable'});
        }
        if (await bcrypt.compare(mots_de_passe, mots_de_pass_hash)) {
            const expiration = Math.floor(Date.now() / 1000) + (60 * 60);
            const payload = {user_id: email, exp: expiration};
            const token = sign(payload, process.env.SECRET_KEY as string);
            return response.status(201).json({token});
        } else {
            return response.status(400).json({message: 'Email ou mots de passe incorrect'});
        }

    } catch (error) {
        console.error('Erreur lors de la récupération utilisateur :', error);
        response.status(500).json({message: 'Erreur serveur'});
    }

}

const dbConnexion = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction) => {

    try {
        const connection = await pool.getConnection();
        const id = request.body.id;
        const mots_de_passe = request.body.mots_de_passe;

        // Exécuter une requête SQL
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT mots_de_passe FROM connexion_serveurs WHERE id_serveur = ?', [id]);
        connection.release();
        const mots_de_pass_hash = rows[0].mots_de_passe;
        if (rows.length === 0) {
            // Si aucun résultat n'est trouvé, renvoyer une erreur 404
            return response.status(404).json({message: 'Serveur introuvable'});
        }
        if (await bcrypt.compare(mots_de_passe, mots_de_pass_hash)) {
            const expiration = Math.floor(Date.now() / 1000) + (30 * 1);
            const payload = {user_id: id, exp: expiration};
            const token = sign(payload, process.env.SECRET_KEY as string);
            return response.status(201).json({token});
        } else {
            return response.status(400).json({message: 'Id ou mots de passe incorect'});
        }

    } catch (error) {
        console.error('Erreur lors de la récupération serveur connexion :', error);
        response.status(500).json({message: 'Erreur serveur'});
    }
}
export {userConnexion,dbConnexion};