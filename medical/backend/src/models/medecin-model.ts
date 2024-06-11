import { Schema, model, Document } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IMedecin extends Document {
    nom: string;
    prenom: string;
    dateNaissance: Date;
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
}

// 2. Create a Schema corresponding to the document interface.
const medecinSchema = new Schema<IMedecin>({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    dateNaissance: { type: Date, required: true },
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
