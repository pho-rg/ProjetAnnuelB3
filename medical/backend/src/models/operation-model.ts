import { Schema, model, Document } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IOperation extends Document {
    typeOperation: string;
    date: Date;
    heure: string;
    duree: string;
    salle: Schema.Types.ObjectId;
    chirurgienID: Schema.Types.ObjectId;
    anesthesisteID: Schema.Types.ObjectId;
    rapportOperatoire: string;
    complications: string;
}

// 2. Create a Schema corresponding to the document interface.
const operationSchema = new Schema<IOperation>({
    typeOperation: { type: String, required: true },
    date: { type: Date, required: true },
    heure: { type: String, required: true },
    duree: { type: String, required: true },
    salle: { type: Schema.Types.ObjectId, ref: 'BlocOperatoire', required: true },
    chirurgienID: { type: Schema.Types.ObjectId, ref: 'Medecin', required: true },
    anesthesisteID: { type: Schema.Types.ObjectId, ref: 'Medecin', required: true },
    rapportOperatoire: { type: String, required: true },
    complications: { type: String, required: false },
});

// 3. Create a Model.
const Operation = model<IOperation>('Operation', operationSchema);
export { Operation, IOperation };
