import { Schema, model, Document } from 'mongoose';
import {IUtilisateur} from './utilisateur-model';

// 1. Create an interface representing a document in MongoDB.
interface IMedecin extends Document {
    sexe: string;
    specialite: string;
    telephone: string;
    email: string;
    adresseProfessionnelle: string;
    numeroLicence: string;
    anneesExperience: number;
    qualifications: string;
    affiliations: string;
    serviceID: Schema.Types.ObjectId;
    utilisateurId: Schema.Types.ObjectId | IUtilisateur;
}

// 2. Create a Schema corresponding to the document interface.
const medecinSchema = new Schema<IMedecin>({
    sexe: { type: String, required: true },
    specialite: { type: String, required: true },
    telephone: { type: String, required: true },
    email: { type: String, required: true },
    adresseProfessionnelle: { type: String, required: true },
    numeroLicence: { type: String, required: true },
    anneesExperience: { type: Number, required: true },
    qualifications: { type: String, required: true },
    affiliations: { type: String, required: true },
    serviceID: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
});

// 3. Create a Model.
const Medecin = model<IMedecin>('Medecin', medecinSchema);
export { Medecin, IMedecin };
