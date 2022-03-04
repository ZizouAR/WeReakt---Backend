import { Schema, model, Document } from 'mongoose';
import User from './User';


export const enum ResponseStatus {
  PENDING = 'PENDING',
  CANCELED = 'CANCELED',
  OVERDUE = 'OVERDUE',
  CLOSED = 'CLOSED'
}



export default interface Request extends Document {
  title: string;
  description: string;
  reply?: string;
  atachement?: Blob; 
  status: ResponseStatus;
  sender: User;
  receiver: User;
  level: User;
  private: boolean;
  createdAt: Date;
  updatedAt?: Date;
  updatedBy?: User;
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
      enum: [ResponseStatus.CANCELED, ResponseStatus.CLOSED, ResponseStatus.OVERDUE, ResponseStatus.PENDING]
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
    receiver: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    level: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    private: {
      type: Schema.Types.Boolean,
      required: true,
      default: false,
    },
    createdAt: {
      type: Date,
      required: true
    },
    updatedAt: {
      type: Date,
      required: false
    },
    updatedBy: {
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


const DOCUMENT_NAME = 'Request';
const COLLECTION_NAME = 'requests';


export const RequestModel = model<Request>(DOCUMENT_NAME, schema, COLLECTION_NAME);
