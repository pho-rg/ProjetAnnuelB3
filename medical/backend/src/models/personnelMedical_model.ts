import mongoose, {Schema, model, Document, ObjectId} from 'mongoose';

/** Interface IPersonnelMedical pour MongoDB*/
interface IPersonnelMedical extends Document {
    _id: ObjectId,
    id_servide: ObjectId,
    nom: string,
    prenom: string,
    date_naissance: Date,
    email: string,
    mots_de_passe: string,
    hopital: string,
}

/** Schema IPersonnelMedical pour Mongoose*/
const personnelMedicalSchema = new Schema<IPersonnelMedical>({
    _id: {type: Schema.Types.ObjectId, required: true},
    id_servide: {type: String, required: true},
    nom: {type: String, required: true},
    prenom: {type: String, required: true},
    date_naissance: {type: Date, required: true},
    email: {type: String, required: true},
    mots_de_passe: {type: String, required: true},
    hopital: {type: String, required: true},
}, {collection: "personnel_medical"});

const PersonnelMedical = model<IPersonnelMedical>(
    'PersonnelMedical',
    personnelMedicalSchema
);

export {PersonnelMedical}