import express from "express";
const connectDB = require('../../connectionMedicalDb');
const mongoose = require('mongoose');
import {ActeMedical} from '../models/acteMedical-model';
import {error} from "console";

/**Recuperation des actes medicaux avec le nir*/
const acteMedicalGetAll = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction) => {
    try {

        /**Récupérer les données de la requête*/
        const num_secu = request.query.nir;
        const nom_service = request.query.service;

        /**Recherche des actes par nir*/
        const result = await ActeMedical.find({num_secu: num_secu,nom_service:nom_service});

        if (!result) {

            /** Renvoyer une reponse not found*/
            return response.status(404).json({message: 'Vide'});
        }else
        {

            /**Renvoyer une réponse de succès*/
            return response.status(200).send(result);
        }
    }catch{

        /**Renvoyer une réponse d'echec*/
        return response.status(500).send(error);
    }
};


/**Post d'un acte medical*/
const acteMedicalPost = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction) => {

    /**Récupérer les données de la requête*/
        const acteMedical = new ActeMedical({
            num_secu:request.body.num_secu,
            date:request.body.date,
            description:request.body.description,
            nom_service:request.body.nom_service,
            nom_medecin:request.body.nom_medecin,
            intitule_acte:request.body.intitule_acte,
        })
    try {

        /**Sauvgarde de l'actes medical*/
        const result = await acteMedical.save();

        /**Renvoyer une réponse de succès*/
        return response.status(201).json(result);
    } catch (err) {

        /**Renvoyer une réponse  d'echec*/
        return response.status(500).json({ message: 'Erreur serveur lors de la sauvegarde' });
    }
};

export{acteMedicalGetAll,acteMedicalPost};