import { Schema, model } from 'mongoose';
import { estValideNir, Nir } from '../utils/customTypes/nir-type';
import {estValideGrpSanguin, GrpSanguin} from '../utils/customTypes/grpSanguin-type';
import { estValideSexe, Sexe } from '../utils/customTypes/sexe-type';

/**
 * CREER des types SEXES
 * Créer regex dates, sexes, email
 * Num securité sociale
 * creéer un type date
 */

interface IDossierMedical{
    nir: Nir;
    nom: string;
    prenom: string;
    sexe: Sexe;
    dateNaissance: Date;
    taille:number;
    poids: number;
    grp_sanguin: GrpSanguin;
    remarques: string;
    pathologies: string[];
    operations: string[];
    allergies: string[];
}

const dossierMedicalShema = new Schema<IDossierMedical>({
    nir: {
        type: String, 
        required: true,
        validate: {
            validator: estValideNir,
            message: 'Format de NIR invalide'
        }
    },
    nom: {type: String, required: true},
    prenom: {type: String, required: true},
    sexe: {
        type: String,
        required: true,
        validate: {
            validator: estValideSexe,
            message: 'Sexe n\'a pas le bon format'
        }
    },
    dateNaissance: {type: Date, required: true},
    taille: {type: Number, required: true},
    poids: {type: Number, required: true},
    grp_sanguin: {
        type: String,
        required: true,
        validate: {
            validator: estValideGrpSanguin,
            message: 'Le groupe sanguin n\'a pas le bon format'
        }},
    remarques: {type: String, required: true},
    pathologies: {type: [String], required: true},
    operations: {type: [String], required: true},
    allergies: {type: [String], required: true}
});

const DossierMedical = model<IDossierMedical>('DossierMedical', dossierMedicalShema);

export{DossierMedical}