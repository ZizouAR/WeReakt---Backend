import { Schema, model, Document } from 'mongoose';
import Network from './Network';


export default interface Departement extends Document {
  name: string;
  network: Network;
  createdAt: Date;
}

const schema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      maxlength: 300
    },
    network: {
      type: Schema.Types.ObjectId,
      ref: 'Network',
      required: true,
      index: true
    },
    createdAt: {
      type: Date,
      required: true
    }
  },
  {
    versionKey: false,
  },
);


const DOCUMENT_NAME = 'Departement';
const COLLECTION_NAME = 'departements';


export const DepartementModel = model<Departement>(DOCUMENT_NAME, schema, COLLECTION_NAME);
