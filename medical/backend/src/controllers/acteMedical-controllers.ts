import express from "express";
const connectDB = require('../../connectionMedicalDb');
const mongoose = require('mongoose');
import {ActeMedical} from '../models/acteMedical-model';
import {error} from "console";


const acteMedicalGetAll = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction) => {
    try {

        const num_secu = request.query.nir;
        const nom_service = request.query.service;

        // Recherche des actes par nir
        const result = await ActeMedical.find({num_secu: num_secu,nom_service:nom_service});

        if (!result) {
            // Si aucun résultat n'est trouvé, renvoyer une erreur 404
            return response.status(404).json({message: 'Vide'});
        }else
        {
            return response.status(200).send(result);
        }
    }catch{

        return response.status(500).send(error);
    }
};

const acteMedicalPost = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction) => {

        const acteMedical = new ActeMedical({
            num_secu:request.body.num_secu,
            date:request.body.date,
            description:request.body.description,
            nom_service:request.body.nom_service,
            nom_medecin:request.body.nom_medecin,
            intitule_acte:request.body.intitule_acte,
        })
    try {
        const result = await acteMedical.save();
        return response.status(201).json(result);
    } catch (err) {
        return response.status(500).json({ message: 'Erreur serveur lors de la sauvegarde' });
    }
};

export{acteMedicalGetAll,acteMedicalPost};