import {Schema, model, Types, ObjectId} from 'mongoose';

import {
    estValideGrpSanguin,
    GrpSanguin,
} from '../utils/customTypes/grpSanguin-type';

/** Interface IDossierMedical pour MongoDB*/
interface IDossierMedical {
    num_secu: string;
    nom: string;
    prenom: string;
    sexe: number;
    date_naissance: string;
    taille: number;
    poids: number;
    grp_sanguin: GrpSanguin;
    remarques: string;
    pathologies: string[];
    operations: string[];
    allergies: string[];
}

/** Schema IDossierMedical pour Mongoose*/
const dossierMedicalSchema = new Schema<IDossierMedical>({
    num_secu: {type: String, required: true},
    nom: {type: String, required: true},
    prenom: {type: String, required: true},
    sexe: {type: Number, required: true,},
    date_naissance: {type: String, required: true},
    taille: {type: Number, required: true},
    poids: {type: Number, required: true},
    grp_sanguin: {
        type: String,
        required: true,
        validate: {
            validator: estValideGrpSanguin,
            message: 'Le groupe sanguin n\'a pas le bon format',
        },
    },
    remarques: {type: String},
    pathologies: {type: [String]},
    operations: {type: [String]},
    allergies: {type: [String]},
}, {collection: 'dossier_medical'});


const DossierMedical = model<IDossierMedical>(
    'DossierMedical',
    dossierMedicalSchema
);

export {DossierMedical};

