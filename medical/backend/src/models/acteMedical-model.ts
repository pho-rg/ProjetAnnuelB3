import {Schema, model, Document, ObjectId} from 'mongoose';

/** Interface IActeMedical pour MongoDB*/
interface IActeMedical extends Document {
    num_secu: string;
    nom_medecin: string;
    nom_service: string;
    date: string;
    description: string;
    intitule_acte: string;
}

/** Schema IActeMedical pour Mongoose*/
const acteMedicalSchema = new Schema<IActeMedical>({
    nom_medecin: {type: String, required: true},
    nom_service: {type: String, required: true},
    num_secu: {type: String, required: true},
    date: {type: String, required: true},
    description: {type: String, required: true},
    intitule_acte: {type: String, required: true},

}, {collection: 'acte_medical'});


const ActeMedical = model<IActeMedical>('ActeMedical', acteMedicalSchema);
export {ActeMedical};
