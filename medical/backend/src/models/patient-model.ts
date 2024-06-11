import { Schema, model, Document } from 'mongoose';
import {IUtilisateur} from './utilisateur-model';
import {estValideGrpSanguin, GrpSanguin} from '../utils/customTypes/grpSanguin-type';
import {estValideSexe, Sexe} from '../utils/customTypes/sexe-type';

// 1. Create an interface representing a document in MongoDB.
interface IPatient extends Document {
    sexe: Sexe;
    adresse: string;
    telephone: string;
    email: string;
    etatCivil: string;
    nir: string;
    antecedentsMedicaux: string;
    medicamentsEnCours: string[];
    allergies: string[];
    grp_sanguin: GrpSanguin;
    habitudesDeVie: string;
    contactUrgence: string[];
    utilisateurId: Schema.Types.ObjectId | IUtilisateur;
}

// 2. Create a Schema corresponding to the document interface.
const patientSchema = new Schema<IPatient>({
    sexe: {
        type: String,
        required: true,
        validate: {
            validator: estValideSexe,
            message: 'Sexe n\'a pas le bon format',
        },
    },
    adresse: { type: String, required: true },
    telephone: { type: String, required: true },
    email: { type: String, required: true },
    etatCivil: { type: String, required: true },
    nir: { type: String, required: true },
    antecedentsMedicaux: { type: String, required: true },
    medicamentsEnCours: { type: [String], required: true },
    allergies: { type: [String], required: true },
    grp_sanguin: {
        type: String,
        required: true,
        validate: {
            validator: estValideGrpSanguin,
            message: 'Le groupe sanguin n\'a pas le bon format',
        },
    },
    habitudesDeVie: { type: String, required: true },
    contactUrgence: { type: [String], required: true },
    utilisateurId: { type: Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
});

// 3. Create a Model.
const Patient = model<IPatient>('Patient', patientSchema);
export { Patient, IPatient };
