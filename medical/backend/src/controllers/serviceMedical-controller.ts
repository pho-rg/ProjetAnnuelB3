import {Service} from '../models/service-model';
import express, {response} from 'express';

const connectDB = require('../../connectionMedicalDb');

const serviceGET = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
) => {
    try {
        const result = await Service.find();
        console.log(request.params.nir);
        if (result) {
            console.log(result);
            return response.status(200).send(result);
        } else {
            return response.status(404).send({message: "Aucun service"});
        }
    } catch (error) {
        console.error(error); // Added logging for better error visibility
        return response.status(500).send(error); // Changed status code to 500 for server error
    }
};

export {serviceGET};