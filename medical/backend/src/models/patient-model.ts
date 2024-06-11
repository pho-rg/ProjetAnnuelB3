import { Schema, model, Document } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IPatient extends Document {
    nom: string;
    prenom: string;
    dateNaissance: Date;
    sexe: string;
    adresse: string;
    telephone: string;
    email: string;
    etatCivil: string;
    nir: string;
    antecedentsMedicaux: string;
    medicamentsEnCours: string;
    allergies: string;
    groupesSanguin: string;
    habitudesDeVie: string;
    contactUrgence: string;
}

// 2. Create a Schema corresponding to the document interface.
const patientSchema = new Schema<IPatient>({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    dateNaissance: { type: Date, required: true },
    sexe: { type: String, required: true },
    adresse: { type: String, required: true },
    telephone: { type: String, required: true },
    email: { type: String, required: true },
    etatCivil: { type: String, required: true },
    nir: { type: String, required: true },
    antecedentsMedicaux: { type: String, required: true },
    medicamentsEnCours: { type: String, required: true },
    allergies: { type: String, required: true },
    groupesSanguin: { type: String, required: true },
    habitudesDeVie: { type: String, required: true },
    contactUrgence: { type: String, required: true },
});

// 3. Create a Model.
const Patient = model<IPatient>('Patient', patientSchema);
export { Patient, IPatient };
