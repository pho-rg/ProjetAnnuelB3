import {rows} from "mssql";
import {RowDataPacket} from "mysql2/promise";
import bcrypt from "bcryptjs";
import {sign, verify} from "jsonwebtoken";
import exp from "node:constants";
import express from "express";
import dotenv from 'dotenv';
dotenv.config();


/*** Extraction du token*/
const extractToken = (authorization: string | undefined): string | false => {
    if (typeof authorization !== 'string') {
        return false;// Vide retourn false
    }
    // On isole le token
    const matches = authorization.match(/(bearer)\s+(\S+)/i);
    if (matches && matches[2]) {
        return matches[2]; // Retourne le token extrait
    } else {
        return false; // Aucune correspondance trouvée, retourne false
    }
}


/***Verification du token*/
const checkTokenValid = ( request: express.Request,
                          response: express.Response,
                          next: express.NextFunction) => {
    const token = request.headers.authorization && extractToken(request.headers.authorization)

 if(!token){
     return response.status(401).json({message:'token non valide ou absent!'})
 }

 verify(token,process.env.SECRET_KEY as string,(err,decodedToken)=>{
     if(err){
         return response.status(401).json({message:'Bad token'})
     }
     next();
 })

}

export {checkTokenValid};