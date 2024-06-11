import {estValideNir, Nir} from '../utils/customTypes/nir-type';
import { Schema, model } from 'mongoose';

interface IUtilisateur {
    nir: Nir;
    nom: string;
    prenom: string;
    date_naissance: Date;
    mdp?: string;
}

const utilisateurSchema = new Schema<IUtilisateur>({
    nir:{
        type: String,
        required: true,
        validate: {
            validator: estValideNir,
            message: 'Format de NIR invalide',
        },
    },
    nom:{ type: String, required: true },
    prenom:{ type: String, required: true },
    date_naissance:{ type: Date, required: true },
    mdp:{ type: String, required: false },
})

const Utilisateur = model<IUtilisateur>(
    'Utilisateur',
    utilisateurSchema
)

export {Utilisateur, IUtilisateur}