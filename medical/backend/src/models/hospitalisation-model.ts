import { Schema, model, Document } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IHospitalisation extends Document {
    patientID: Schema.Types.ObjectId;
    chambreID: Schema.Types.ObjectId;
    dateAdmission: Date;
    dateSortie: Date;
    motifAdmission: string;
    diagnostic: string;
    traitement: string;
    medecinResponsableID: Schema.Types.ObjectId;
    observations: string;
}

// 2. Create a Schema corresponding to the document interface.
const hospitalisationSchema = new Schema<IHospitalisation>({
    patientID: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    chambreID: { type: Schema.Types.ObjectId, ref: 'Chambre', required: true },
    dateAdmission: { type: Date, required: true },
    dateSortie: { type: Date, required: false },
    motifAdmission: { type: String, required: true },
    diagnostic: { type: String, required: true },
    traitement: { type: String, required: true },
    medecinResponsableID: { type: Schema.Types.ObjectId, ref: 'Medecin', required: true },
    observations: { type: String, required: true },
});

// 3. Create a Model.
const Hospitalisation = model<IHospitalisation>('Hospitalisation', hospitalisationSchema);
export { Hospitalisation, IHospitalisation };
