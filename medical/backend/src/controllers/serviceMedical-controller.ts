import {Service} from '../models/serviceMedical-model';
import express, {response} from 'express';

const connectDB = require('../../connectionMedicalDb');

const serviceGET = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
) => {
    try {
        /**Recherche tous les services*/
        const result = await Service.find();

        if (result) {

            /**Renvoyer une réponse de succès*/
            return response.status(200).send(result);
        } else {

            /**Si aucun résultat n'est trouvé, renvoyer une erreur 404*/
            return response.status(404).send({message: "Aucun service"});
        }
    } catch (error) {

        /**Renvoyer une réponse d'echec*/
        return response.status(500).send(error);
    }
};
export {serviceGET};