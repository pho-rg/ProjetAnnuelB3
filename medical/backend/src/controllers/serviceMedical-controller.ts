import {Service} from '../models/serviceMedical-model';
import express, {response} from 'express';

const connectDB = require('../../connectionMedicalDb');

const serviceGET = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
) => {
    try {
        const result = await Service.find();

        if (result) {

            return response.status(200).send(result);
        } else {
            return response.status(404).send({message: "Aucun service"});
        }
    } catch (error) {

        return response.status(500).send(error);
    }
};

export {serviceGET};