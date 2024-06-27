import express from "express";
const connectDB = require('../../connectionMedicalDb');
const mongoose = require('mongoose');
import bcrypt from "bcryptjs";
import {sign} from "jsonwebtoken";
import exp from "node:constants";
import dotenv from 'dotenv';
import {PersonnelMedical} from "../models/personnelMedical_model";
dotenv.config();

const userConnexion = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction) => {

    try {
        const email = request.body.email;
        const mots_de_passe = request.body.mots_de_passe;

        // Recherche l'utilisateur par l'email
        const result = await PersonnelMedical.findOne({email:email});
        if (!result) {
            // Si aucun résultat n'est trouvé, renvoyer une erreur 404
            return response.status(404).json({message: 'Utilisateur introuvable'});
        }
        const mots_de_pass_hash= result.mots_de_passe;
        if (await bcrypt.compare(mots_de_passe, mots_de_pass_hash)) {
            const expiration = Math.floor(Date.now() / 1000) + (60 * 60);
            const payload = {user_id: email, exp: expiration};
            const token = sign(payload, process.env.SECRET_KEY as string);
            return response.status(201).json({token});
        } else {
            return response.status(400).json({message: 'Email ou mots de passe incorect'});
        }
        return response.status(200).json({result});

    } catch (error) {
        response.status(500).json({message: 'Erreur serveur'});
    }
}
export {userConnexion};