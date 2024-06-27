import express from "express";
import dotenv from 'dotenv';
import {PersonnelMedical} from "../models/personnelMedical_model";
import {error} from "console";
const connectDB = require('../../connectionMedicalDb');
const mongoose = require('mongoose');
dotenv.config();

const personnelMedicalgetOne = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction) => {
    try {
        const email = request.params.email;
        // Recherche l'utilisateur par l'email
        const result = await PersonnelMedical.findOne({email: email});
        if (!result) {
            // Si aucun résultat n'est trouvé, renvoyer une erreur 404
            return response.status(404).json({message: 'Utilisateur introuvable'});
        } else {
            return response.status(200).send(result);
        }
    } catch {
        return response.status(500).send(error);
    }
};
export {personnelMedicalgetOne};