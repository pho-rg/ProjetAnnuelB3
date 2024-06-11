import { Schema, model, Document } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IActeMedical extends Document {
    patientID: Schema.Types.ObjectId;
    operationID?: Schema.Types.ObjectId;
    acteType: string;
    date: Date;
    heure: string;
    personnelAssocieID: Schema.Types.ObjectId[];
    description: string;
    resultats?: string;
}

// 2. Create a Schema corresponding to the document interface.
const acteMedicalSchema = new Schema<IActeMedical>({
    patientID: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    operationID: { type: Schema.Types.ObjectId, ref: 'Operation', required: false },
    acteType: { type: String, required: true },
    date: { type: Date, required: true },
    heure: { type: String, required: true },
    personnelAssocieID: [{ type: Schema.Types.ObjectId, ref: 'Medecin', required: true }],
    description: { type: String, required: true },
    resultats: { type: String, required: false },
});

// 3. Create a Model.
const ActeMedical = model<IActeMedical>('ActeMedical', acteMedicalSchema);
export { ActeMedical, IActeMedical };
