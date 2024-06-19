import { Schema, model, Document } from 'mongoose';
import {IMedecin} from "./medecin-model";

// 1. Create an interface representing a document in MongoDB.
interface IService extends Document {
    nom: string;
    localisation: string;
    telephone: string;
    responsableID: Schema.Types.ObjectId | IMedecin; // Type acceptant soit un ObjectId soit un objet correspondant à l'interface IMedecin
}

// 2. Create a Schema corresponding to the document interface.
const serviceSchema = new Schema<IService>({
    nom: { type: String, required: true },
    localisation: { type: String, required: true },
    telephone: { type: String, required: true },
    responsableID: { type: Schema.Types.ObjectId, ref: 'Medecin', required: true }
});

// 3. Create a Model.
const Service = model<IService>('Service', serviceSchema);
export { Service, IService };