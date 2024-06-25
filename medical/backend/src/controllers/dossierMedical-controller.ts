import * as config from '../../config.json';
import {DossierMedical} from '../models/dossierMedical-model';
import express, {response} from 'express';
import {ifError} from 'assert';
import {error} from 'console';

const connectDB = require('../../connectionMedicalDb');
//const DossierMedical = require('../models/dossierMedical-model');
const mongoose = require('mongoose');
import axios from 'axios';
import dotenv from 'dotenv';
import {header} from "express-validator";

dotenv.config();


const dossierMedicalNirGETONE = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
) => {
    try {
        const nir = request.params.nir;
        const result = await DossierMedical.collection.findOne({nir: nir});
        if (result) {
            return response.status(200).send(result);
        } else {
            const body = {"id": process.env.ID, "mots_de_passe": process.env.MOTS_DE_PASSE}
            await axios.post('http://localhost:5001/login/Db/',body)
                .then(responseLogin => {
                    const token = responseLogin.data.token;
                    axios.get('http://localhost:5001/dossAdmin/getOne/Db/'+ nir, {headers: {'Authorization': `Bearer ${token}`}})
                        .then(res => {
                            return response.status(200).send(res.data);
                        })
                        .catch(error => {
                            return response.status(404).json({message: 'Aucun dossier medical ou administratif avec le nir:' + nir})
                        });
                })
                .catch(error => {
                    return response.status(400).json({message: 'Erreur connexion base de données Admin'})
                });

            return response.status(200);
        }
    } catch (error) {
        console.error(error); // Added logging for better error visibility
        return response.status(500).send(error); // Changed status code to 500 for server error
    }
};

export {dossierMedicalNirGETONE};