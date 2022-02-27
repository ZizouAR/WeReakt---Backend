import { Schema, model, Document } from 'mongoose';
import Departement from './Department';
import Role from './Role';



export default interface Job extends Document {
  title: string;
  description?: string;
  departement: Departement;
  roles?: Role[];
}



const schema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      required: true,
      maxlength: 200
    },
    description: {
      type: Date,
      required: false,
      maxlength: 500
    },
    departement: {
      type: Schema.Types.ObjectId,
      ref: 'Departement',
      required: true,
      index: true,
    },
    roles: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Role',
        },
      ],
      required: true,
      select: false,
    },
  },
  {
    versionKey: false,
  },
);


const DOCUMENT_NAME = 'Job';
const COLLECTION_NAME = 'jobs';


export const JobModel = model<Job>(DOCUMENT_NAME, schema, COLLECTION_NAME);
