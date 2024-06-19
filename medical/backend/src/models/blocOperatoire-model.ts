import { Schema, model, Document } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IBlocOperatoire extends Document {
    numero: string;
    localisation: string;
    taille: string;
    capacite: string;
    equipements: string;
    systemesSecurite: string;
    horairesDisponibilite: string;
}

// 2. Create a Schema corresponding to the document interface.
const blocOperatoireSchema = new Schema<IBlocOperatoire>({
    numero: { type: String, required: true },
    localisation: { type: String, required: true },
    taille: { type: String, required: true },
    capacite: { type: String, required: true },
    equipements: { type: String, required: true },
    systemesSecurite: { type: String, required: true },
    horairesDisponibilite: { type: String, required: true },
});

// 3. Create a Model.
const BlocOperatoire = model<IBlocOperatoire>('BlocOperatoire', blocOperatoireSchema);
export { BlocOperatoire, IBlocOperatoire };
