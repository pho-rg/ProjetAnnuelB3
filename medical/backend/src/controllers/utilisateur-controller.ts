import {Utilisateur} from '../models/utilisateur-model';
import express from 'express';
import {connect} from 'mongoose';
import * as config from '../../config.json';
/**
 * Ecris une fonction controller qui permet de créer un utilisateur après une requêtes POST
 *
 */
const utilisateurPOST = async (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
    try {
        const body = request.body;
        await connect(config.MOGODB_URL);
        const utilisateur = new Utilisateur(body);
        utilisateur.save()
        .then((result) => {
            console.log(result);
            return response.status(200).send(result);
        })
        .catch((error) => {
            return response.status(400).send(error);
        });
    } catch (error) {
        return response.status(400).send(error);
    }
}

/**
 * Ecris une fonction controller qui permet de récupérer un utilisateur après une requêtes GET
 *
 */
const utilisateurGET = async (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
    try {
        await connect(config.MOGODB_URL);
        Utilisateur.findOne(
            {nir: request.params.nir}
        )
        .exec()
        .then((result) => {
            console.log(result);
            return response.status(200).send(result);
        })
        .catch((error) => {
            return response.status(400).send(error);
        });
    } catch (error) {
        return response.status(400).send(error);
    }
}

/**
 * Ecris une fonction controller qui permet de récupérer tous les utilisateurs après une requêtes GET
 *
 */
const utilisateurGETALL = async (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
    try {
        await connect(config.MOGODB_URL);
        Utilisateur.find()
        .exec()
        .then((result) => {
            console.log(result);
            return response.status(200).send(result);
        })
        .catch((error) => {
            return response.status(400).send(error);
        });
    } catch (error) {
        return response.status(400).send(error);
    }
}

/**
 * Ecris une fonction controller qui permet de récupérer tous les utilisateurs paginés après une requêtes GET
 *
 */
const utilisateurGETPAGINE = async (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
    try {
        const params = request.params;
        const limite: number = Number(params.limite);
        const page: number = Number(params.page);
        await connect(config.MOGODB_URL);
        Utilisateur.find().limit(limite).skip(page*limite)
        .exec()
        .then((result) => {
            console.log(result);
            return response.status(200).send(result);
        })
        .catch((error) => {
            return response.status(400).send(error);
        });
    } catch (error) {
        return response.status(400).send(error);
    }
}

/**
 * Ecris une fonction controller qui permet de modifier un utilisateur après une requêtes PATCH
 *
 */
const utilisateurPATCH = async (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
    try {
        const body = request.body;
        await connect(config.MOGODB_URL);
        Utilisateur.updateOne(
            {nir: body.nir},
            body
        )
        .exec()
        .then((result) => {
            console.log(result);
            return response.status(200).send(result);
        })
        .catch((error) => {
            return response.status(400).send(error);
        });
    } catch (error) {
        return response.status(400).send(error);
    }
}

/**
 * Ecris une fonction controller qui permet de supprimer un utilisateur après une requêtes DELETE
 *
 */
const utilisateurDELETEONE = async (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
    try {
        await connect(config.MOGODB_URL);
        Utilisateur.deleteOne(
            {nir: request.params.nir}
        )
        .exec()
        .then((result) => {
            console.log(result);
            return response.status(200).send(result);
        })
        .catch((error) => {
            return response.status(400).send(error);
        });
    } catch (error) {
        return response.status(400).send(error);
    }
}

export{utilisateurPOST, utilisateurGET, utilisateurGETALL, utilisateurGETPAGINE, utilisateurPATCH, utilisateurDELETEONE}


