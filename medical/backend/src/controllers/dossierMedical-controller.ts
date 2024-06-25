import {DossierMedical} from '../models/dossierMedical-model';
import express, {response} from 'express';
import {error} from 'console';
const connectDB = require('../../connectionMedicalDb');
const mongoose = require('mongoose');
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();




const dossierAdminExists = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
) => {
    const nir = request.params.nir;
    try {
        const body = {"id": process.env.ID, "mots_de_passe": process.env.MOTS_DE_PASSE}
        await axios.post('http://localhost:5001/login/Db/', body)
            .then(responseLogin => {
                const token = responseLogin.data.token;
                axios.get('http://localhost:5001/dossAdmin/exists/Db/' + nir, {headers: {'Authorization': `Bearer ${token}`}})
                    .then(res => {
                        return response.status(200).json({"exists": true, message: 'Dossier administratif existant'});
                    })
                    .catch(error => {
                        return response.status(404).json({"exists": false, message: 'Dossier administratif inexistant'});
                    });
            })
    }catch{
        console.error(error); // Added logging for better error visibility
        return response.status(500).send(error); // Changed status code to 500 for server error
    }
};

const dossierMedicalExists = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
) => {
    const nir = request.params.nir;
    try {
        const nir = request.params.nir;
        const result = await DossierMedical.collection.findOne({num_secu: nir});
        if(result){
            return response.status(200).json({"exists":true, message:'Dossier medical existant'});
        }
        else
        {return response.status(404).json({"exists":false, message:'Dossier medical existant'});
        }

    }catch{
        console.error(error); // Added logging for better error visibility
        return response.status(500).send(error); // Changed status code to 500 for server error
    }
};


const dossierMedicalNirGETONE = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
) => {
    try {
        const nir = request.params.nir;
        const result = await DossierMedical.collection.findOne({num_secu: nir});
        if (result) {
            return response.status(200).send(result);
        } else {
            const body = {"id": process.env.ID, "mots_de_passe": process.env.MOTS_DE_PASSE}
            await axios.post('http://localhost:5001/login/Db/', body)
                .then(responseLogin => {
                    const token = responseLogin.data.token;
                    axios.get('http://localhost:5001/dossAdmin/getOne/Db/' + nir, {headers: {'Authorization': `Bearer ${token}`}})
                        .then(res => {
                            return response.status(200).send(res.data);
                        })
                        .catch(error => {
                            return response.status(404).json({message: 'Aucun dossier medical ou administratif avec le nir: ' + nir})
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


const dossierMedicauxSearch = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
) =>{
    try{
        const nom = request.query.nom;
        const prenom = request.query.prenom;
        DossierMedical.find({
            nom: { $regex: nom, $options: 'i' },
            prenom: { $regex: prenom, $options: 'i' }
        }).then((results) => {
                console.log('Résultats de la recherche:', results);
                return response.status(200).send(results);
            })
            .catch((err) => {
                console.error('Erreur lors de la recherche:', err);
                return response.status(404).send({message:"aucun dossier !"});
            });

    }catch{
        return response.status(500);
    }
};

export {dossierMedicalNirGETONE,dossierAdminExists,dossierMedicalExists,dossierMedicauxSearch};