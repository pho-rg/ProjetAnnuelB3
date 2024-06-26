import {DossierMedical} from '../models/dossierMedical-model';
import express, {response} from 'express';
import {error} from 'console';

const connectDB = require('../../connectionMedicalDb');
const mongoose = require('mongoose');
import axios from 'axios';
import dotenv from 'dotenv';
import {IDossierAdmin} from "../models/dossierAdmin-model";

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
                        return response.status(404).json({
                            "exists": false,
                            message: 'Dossier administratif inexistant'
                        });
                    });
            })
    } catch {
        console.error(error);
        return response.status(500).send(error);
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
        const result = await DossierMedical.findOne({num_secu: nir});
        if (result) {
            return response.status(200).json({"exists": true, message: 'Dossier medical existant'});
        } else {
            return response.status(404).json({"exists": false, message: 'Dossier medical existant'});
        }

    } catch {
        console.error(error);
        return response.status(500).send(error);
    }
};


const dossierMedicalNirGETONE = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
) => {
        const nir = request.params.nir;
        var token :string;
        var messageErreur = "";
        let dossierMedical = new DossierMedical();
        const body = {"id": process.env.ID, "mots_de_passe": process.env.MOTS_DE_PASSE}
    try {
        token = await axios.post('http://localhost:5001/login/Db/', body)
            .then(responseLogin => {
                return responseLogin.data.token;}).catch(err => {messageErreur="erreur connexion base de données admin";});

        const dossierAdmin = await axios.get('http://localhost:5001/dossAdmin/getOne/Db/' + nir, {headers: {'Authorization': `Bearer ${token}`}})
            .then(res => {
                return res.data;}).catch(err => {messageErreur="erreur recuperation dossier administratif";});

        dossierMedical.nom=dossierAdmin.nom;
        dossierMedical.prenom=dossierAdmin.prenom;
        dossierMedical.sexe=dossierAdmin.sexe;
        dossierMedical.date_naissance=dossierAdmin.date_naissance;

        var result = await DossierMedical.findOne({num_secu: nir});
        if (!result) {
            return response.status(200).send(dossierMedical);
        } else {
            dossierMedical.taille=result.taille;
            dossierMedical.poids=result.poids;
            dossierMedical.grp_sanguin=result.grp_sanguin;
            dossierMedical.remarques=result.remarques;
            dossierMedical.pathologies=result.pathologies;
            dossierMedical.allergies=result.allergies;
            dossierMedical.operations=result.operations;

            return response.status(200).send(dossierMedical);
        }
    } catch (error) {
        return response.status(500).send({messageErreur});
    }
};


const dossierMedicauxSearch = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
) => {
    try {
        const nom = request.query.nom;
        const prenom = request.query.prenom;
        DossierMedical.find({
            nom: {$regex: nom, $options: 'i'},
            prenom: {$regex: prenom, $options: 'i'}
        }).then((results) => {
            console.log('Résultats de la recherche:', results);
            return response.status(200).send(results);
        })
            .catch((err) => {
                console.error('Erreur lors de la recherche:', err);
                return response.status(404).send({message: "aucun dossier !"});
            });

    } catch {
        return response.status(500);
    }
};

export {dossierMedicalNirGETONE, dossierAdminExists, dossierMedicalExists, dossierMedicauxSearch};