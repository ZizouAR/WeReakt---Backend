import { Schema, model, Document } from 'mongoose';
import Network from './Network';
import User from './User';



export default interface Hierarchy extends Document {
  network: Network;
  updatedBy: User;
  updatedAt?: Date;
  hierarchy: JSON;
}


const schema = new Schema(
  {
    network: {
      type: Schema.Types.ObjectId,
      ref: 'Network',
      required: true,
      index: true
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    updatedAt: {
      type: Date,
      required: false
    },
    hierarchy: {
      type: Schema.Types.String,
      required: true,
    }
  },
  {
    versionKey: false,
  },
);


const DOCUMENT_NAME = 'Hierarchy';
const COLLECTION_NAME = 'hierarchies';


export const HierarchyModel = model<Hierarchy>(DOCUMENT_NAME, schema, COLLECTION_NAME);
