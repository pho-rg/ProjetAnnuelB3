import {Schema, model, Document, ObjectId} from 'mongoose';

/** Interface IServiceMedical pour MongoDB*/
interface IService extends Document {
    _id: ObjectId,
    nom: string;

}

/** Schema IServiceMedical pour Mongoose*/
const serviceSchema = new Schema<IService>({
    _id:{type:Schema.Types.ObjectId,required:true},
    nom: { type: String, required: true },
}, {collection: 'service_medical'});


const Service = model<IService>('Service', serviceSchema);
export { Service};