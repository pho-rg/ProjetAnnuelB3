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
        /**Creer une connexion avec la base de données SQL*/
        const connection = await pool.getConnection();

        /**Recuperation des données dans le body de la requete*/
        const email = request.body.email;
        const mots_de_passe = request.body.mots_de_passe;

        /**Execute une requete sur la base de données SQL*/
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT mots_de_passe FROM personnel_administratif WHERE email = ?', [email]);

        /**Fermeture de la connexion avec la base de données SQL*/
        connection.release();

        /**Test si le mots de passe en BDD correspond au mots de passe de la requete
         * Les mots de passes sont hashes en BDD */
        const mots_de_pass_hash = rows[0].mots_de_passe;
        if (rows.length === 0) {

            /** Renvoyer une reponse not found*/
            return response.status(404).json({message: 'Serveur introuvable'});
        }
        if (await bcrypt.compare(mots_de_passe, mots_de_pass_hash)) {

            /**Si les mots de passes correspondent alors on genere un token pour une session de 1 heure*/
            const expiration = Math.floor(Date.now() / 1000) + (60 * 60);
            const payload = {user_id: email, exp: expiration};
            const token = sign(payload, process.env.SECRET_KEY as string);
            return response.status(201).json({token});
        } else {
            /**Renvoyer une réponse  mauvaise requete*/
            return response.status(400).json({message: 'Email ou mots de passe incorrect'});
        }

    } catch (error) {

        /**Renvoyer une réponse d'echec*/
        response.status(500).json({message: 'Erreur serveur'});
    }

}

const dbConnexion = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction) => {

    try {
        /**Creer une connexion avec la base de données SQL*/
        const connection = await pool.getConnection();

        /**Recuperation des données dans le body de la requete*/
        const id = request.body.id;
        const mots_de_passe = request.body.mots_de_passe;

        /**Execute une requete sur la base de données SQL*/
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT mots_de_passe FROM connexion_serveurs WHERE id_serveur = ?', [id]);

        /**Fermeture de la connexion avec la base de données SQL*/
        connection.release();

        /**Test si le mots de passe en BDD correspond au mots de passe de la requete
         * Les mots de passes sont hashes en BDD */
        const mots_de_pass_hash = rows[0].mots_de_passe;
        if (rows.length === 0) {

            /** Renvoyer une reponse not found*/
            return response.status(404).json({message: 'Serveur introuvable'});
        }
        if (await bcrypt.compare(mots_de_passe, mots_de_pass_hash)) {

            /**Si les mots de passes correspondent alors on genere un token pour une session de 30 secondes*/
            const expiration = Math.floor(Date.now() / 1000) + (30 * 1);
            const payload = {user_id: id, exp: expiration};
            const token = sign(payload, process.env.SECRET_KEY as string);
            return response.status(201).json({token});
        } else {

            /**Renvoyer une réponse  mauvaise requete*/
            return response.status(400).json({message: 'Id ou mots de passe incorect'});
        }
    } catch (error) {

        /**Renvoyer une réponse d'echec*/
        response.status(500).json({message: 'Erreur serveur'});
    }
}
export {userConnexion,dbConnexion};