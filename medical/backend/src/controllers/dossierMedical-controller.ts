import {DossierMedical} from '../models/dossierMedical-model';
import express, {response} from 'express';
import {error} from 'console';
const connectDB = require('../../connectionMedicalDb');
const mongoose = require('mongoose');
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

/**Verification si un dossier admin existe*/
const dossierAdminExists = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
) => {

    /**Recuperation des données dans les parametres de la requete*/
    const nir = request.params.nir;

    try {
        /**Creation d'un body pour la requete au serveur admin*/
        const body = {"id": process.env.ID, "mots_de_passe": process.env.MOTS_DE_PASSE}

        /**Recuperation d'un token de 30 secondes pour effectuer le requete de get sur le serveur admin*/
        await axios.post('http://localhost:5001/login/Db/', body)
            .then(responseLogin => {
                const token = responseLogin.data.token;

                /**Requete au serveur admin pour savoir si un dossier admin existe*/
                axios.get('http://localhost:5001/dossAdmin/exists/Db/' + nir, {headers: {'Authorization': `Bearer ${token}`}})
                    .then(res => {

                        /**Renvoyer une réponse de succès*/
                        return response.status(200).json({"exists": true, message: 'Dossier administratif existant'});
                    })
                    .catch(error => {

                        /**Si aucun résultat n'est trouvé, renvoyer une erreur 404*/
                        return response.status(404).json({
                            "exists": false,
                            message: 'Dossier administratif inexistant'
                        });
                    });
            })
    } catch {

        /**Renvoyer une réponse d'echec*/
        return response.status(500).send(error);
    }
};

/**Verification si un dossier medical existe*/
const dossierMedicalExists = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
) => {
    /**Recuperation des données dans les parametres de la requete*/
    const nir = request.params.nir;

    try {
        /**Requete au serveur medical pour savoir si un dossier medical existe*/
        const result = await DossierMedical.findOne({num_secu: nir});
        if (result) {

            /**Renvoyer une réponse de succès*/
            return response.status(200).json({"exists": true, message: 'Dossier medical existant'});
        } else {

            /**Si aucun résultat n'est trouvé, renvoyer une erreur 404*/
            return response.status(404).json({"exists": false, message: 'Dossier medical non existant'});
        }
    } catch {

        /**Renvoyer une réponse d'echec*/
        return response.status(500).send(error);
    }
};

/**Verification si un dossier medical existe*/
const dossierMedicalNirGETONE = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
) => {

    /**Recuperation des données dans les parametres de la requete*/
    const nir = request.params.nir;


    var token: string;
    var messageErreur = "";
    let dossierMedical = new DossierMedical();

    /**Creation d'un body pour la requete au serveur admin*/
    const body = {"id": process.env.ID, "mots_de_passe": process.env.MOTS_DE_PASSE}
    try {
        token = await axios.post('http://localhost:5001/login/Db/', body)
            .then(responseLogin => {
                /**Recuperation du token*/
                return responseLogin.data.token;
            }).catch(err => {
                messageErreur = "erreur connexion base de données admin";
            });

        /**Requete au serveur admin pour recuperer un dossier à jour*/
        const dossierAdmin = await axios.get('http://localhost:5001/dossAdmin/getOne/Db/' + nir, {headers: {'Authorization': `Bearer ${token}`}})
            .then(res => {
                /**Retourne le dossier administratif à jour*/
                return res.data;
            }).catch(err => {
                messageErreur = "erreur recuperation dossier administratif";
            });

        /**Mise a jour des parametres admin du dossier medical*/
        dossierMedical.nom = dossierAdmin.nom;
        dossierMedical.prenom = dossierAdmin.prenom;
        dossierMedical.sexe = dossierAdmin.sexe;
        dossierMedical.date_naissance = dossierAdmin.date_naissance;

        /**Recuperation dossier medical si il existe*/
        var result = await DossierMedical.findOne({num_secu: nir});
        if (!result) {
            return response.status(200).send(dossierMedical);
        } else {
            dossierMedical.taille = result.taille;
            dossierMedical.poids = result.poids;
            dossierMedical.grp_sanguin = result.grp_sanguin;
            dossierMedical.remarques = result.remarques;
            dossierMedical.pathologies = result.pathologies;
            dossierMedical.allergies = result.allergies;
            dossierMedical.operations = result.operations;
            /**Renvoyer une réponse de succès*/
            return response.status(200).send(dossierMedical);
        }
    } catch (error) {
        /**Renvoyer une réponse d'echec*/
        return response.status(500).send({messageErreur});
    }
};

/**Recherche des dossier medicaux avec des parametres*/
const dossierMedicalSearch = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
) => {
    try {
        /**Recuperation des données dans les parametres de la requete*/
        const nom = request.query.nom;
        const prenom = request.query.prenom;

        /**Recuperation des dossier medicaux qui correspondent au parametres*/
        DossierMedical.find({
            nom: {$regex: nom, $options: 'i'},
            prenom: {$regex: prenom, $options: 'i'}
        }).then((results) => {
            /**Renvoyer une réponse de succès*/
            return response.status(200).send(results);
        }).catch((err) => {
            /**Si aucun résultat n'est trouvé, renvoyer une erreur 404*/
                return response.status(404).send({message: "aucun dossier !"});
            });
    } catch {
        /**Renvoyer une réponse d'echec*/
        return response.status(500);
    }
};

/**Verification si un dossier medical existe*/
const dossierMedicalPost = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction) => {

    /**Recuperation des données dans le body de la requete*/
    const dossierMedical = new DossierMedical({
        num_secu: request.body.num_secu,
        nom: request.body.nom,
        prenom: request.body.prenom,
        sexe: request.body.sexe,
        date_naissance: request.body.date_naissance,
        taille: request.body.taille,
        poids: request.body.poids,
        grp_sanguin: request.body.grp_sanguin,
        remarques: request.body.remarques,
        pathologies: request.body.pathologies,
        operations: request.body.operations,
        allergies: request.body.allergies,
    })
    try {
        /**Sauvgarde du dossier medical dans la base de données*/
        const result = await dossierMedical.save();

        /**Renvoyer une réponse de succès*/
        return response.status(201).json(result);
    } catch (err) {
        /**Renvoyer une réponse d'echec*/
        return response.status(500).json({message: 'Erreur serveur lors de la sauvegarde'});
    }

};

/**Verification si un dossier medical existe*/
const dossierMedicalPatch = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction) => {

    let dossierMedical: any;

    /**Recuperation des données dans le body de la requete*/
    const num_secu = request.body.num_secu;

    /**Recherche du dossier medical dans la base de données*/
    await DossierMedical.findOne({num_secu: num_secu}).then((results) => {
        if (results) {
            dossierMedical = results;
        } else {
            return response.status(404).json({message: "Aucun dossier avec le nir envoyé trouvé"})
        }
    }).catch((err) => {
        return response.status(400)
    });
    if (dossierMedical) {
        dossierMedical.nom = request.body.nom;
        dossierMedical.prenom = request.body.prenom;
        dossierMedical.sexe = request.body.sexe;
        dossierMedical.date_naissance = request.body.date_naissance;
        dossierMedical.taille = request.body.taille;
        dossierMedical.poids = request.body.poids;
        dossierMedical.grp_sanguin = request.body.grp_sanguin;
        dossierMedical.remarques = request.body.remarques;
        dossierMedical.pathologies = request.body.pathologies;
        dossierMedical.operations = request.body.operations;
        dossierMedical.allergies = request.body.allergies;
    } else {
        return response.status(404);
    }
    try {
        /**Sauvgarde du dossier medical dans la base de données*/
        await dossierMedical.save()
        /**Renvoyer une réponse de succès*/
        return response.status(201).json({message: "Mise a jour dossier reussie"});
    } catch (error) {
        /**Renvoyer une réponse d'echec*/
        return response.status(500).json({message: "erreur serveur", error})
    }
};

export {
    dossierMedicalNirGETONE,
    dossierAdminExists,
    dossierMedicalExists,
    dossierMedicalSearch,
    dossierMedicalPost,
    dossierMedicalPatch
};
