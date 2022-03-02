import { Schema, model, Document } from 'mongoose';
import User from './User';
import { ResponseStatus } from './Request';


export default interface Support extends Document {
  title: string;
  description: string;
  reply?: string;
  atachement?: Blob; 
  sender: User;
  status: ResponseStatus;
  createdAt: Date;
  repliedAt?: Date;
  repliedBy?: User;
}

const schema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      required: true,
      maxlength: 300
    },
    description: {
      type: Schema.Types.String,
      required: true,
      maxlength: 1000
    },
    atachement: {
      // max 16mb
      type: Schema.Types.Buffer,
      required: false
    },
    status: {
      type: Schema.Types.String,
      required: true,
      default: ResponseStatus.PENDING,
      enum: [ResponseStatus.CANCELED, ResponseStatus.DONE, ResponseStatus.OVERDUE, ResponseStatus.PENDING]
    },
    reply: {
      type: Schema.Types.String,
      required: false,
      maxlength: 1000,
      default: null
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    createdAt: {
      type: Date,
      required: true
    },
    repliedAt: {
      type: Date,
      required: false
    },
    repliedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
      index: true
    },
  },
  {
    versionKey: false,
  },
);


const DOCUMENT_NAME = 'Support';
const COLLECTION_NAME = 'support';


export const RequestModel = model<Support>(DOCUMENT_NAME, schema, COLLECTION_NAME);
