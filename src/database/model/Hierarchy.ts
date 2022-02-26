import { Schema, model, Document } from 'mongoose';
import User from './User';



export const enum INDUSTRIES {
  ADVERTISING = 'ADVERTISING',
  MARKETING = 'MARKETING',
  TECHNOLOGY = 'TECHNOLOGY',
  HEALTH = 'HEALTH',
  FOOD = 'FOOD',
  ENTERTAINEMENT = 'ENTERTAINEMENT',
  PRODUCTION = 'PRODUCTION'
}




export default interface Hierarchy extends Document {
  network: string;
  createdBy: User;
  createdAt: Date;
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
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    createdAt: {
      type: Date,
      required: true
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
