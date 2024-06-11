import { Schema, model, Document } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IChambre extends Document {
    numero: string;
    localisation: string;
    type: string;
    taille: string;
    nombreLits: number;
    equipements: string;
    systemeSecurite: string;
    sanitaires: string;
}

// 2. Create a Schema corresponding to the document interface.
const chambreSchema = new Schema<IChambre>({
    numero: { type: String, required: true },
    localisation: { type: String, required: true },
    type: { type: String, required: true },
    taille: { type: String, required: true },
    nombreLits: { type: Number, required: true },
    equipements: { type: String, required: true },
    systemeSecurite: { type: String, required: true },
    sanitaires: { type: String, required: true },
});

// 3. Create a Model.
const Chambre = model<IChambre>('Chambre', chambreSchema);
export { Chambre, IChambre };
