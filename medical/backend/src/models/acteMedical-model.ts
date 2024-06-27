import {Schema, model, Document, ObjectId} from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IActeMedical extends Document {
    num_secu: string;
    nom_medecin: string;
    nom_service: string;
    date: string;
    description: string;
    intitule_acte: string;
}

// 2. Create a Schema corresponding to the document interface.
const acteMedicalSchema = new Schema<IActeMedical>({
    nom_medecin: {type: String, required: true},
    nom_service: {type: String, required: true},
    num_secu: {type: String, required: true},
    date: {type: String, required: true},
    description: {type: String, required: true},
    intitule_acte: {type: String, required: true},

}, {collection: 'acte_medical'});

// 3. Create a Model.
const ActeMedical = model<IActeMedical>('ActeMedical', acteMedicalSchema);
export {ActeMedical};
