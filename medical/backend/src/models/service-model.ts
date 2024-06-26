import {Schema, model, Document, ObjectId} from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IService extends Document {
    _id: ObjectId,
    nom: string;

}

// 2. Create a Schema corresponding to the document interface.
const serviceSchema = new Schema<IService>({
    _id:{type:Schema.Types.ObjectId,required:true},
    nom: { type: String, required: true },
},{ collection: 'service_medical' });

// 3. Create a Model.
const Service = model<IService>('Service', serviceSchema);
export { Service, IService };