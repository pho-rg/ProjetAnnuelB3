import { Schema, model, Document } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IService extends Document {
    _id: Schema.Types.ObjectId,
    nom: string;
    localisation: string;
    telephone: string;
    responsableID: string; // Type acceptant soit un ObjectId soit un objet correspondant à l'interface IMedecin
}

// 2. Create a Schema corresponding to the document interface.
const serviceSchema = new Schema<IService>({
    nom: { type: String, required: true },
    localisation: { type: String, required: true },
    telephone: { type: String, required: true },
    responsableID: { type: String, required: false }
},{ collection: 'service_medical' });

// 3. Create a Model.
const Service = model<IService>('Service', serviceSchema);
export { Service, IService };