import { Schema, model, Document } from 'mongoose';
import User from './User';


export const enum AttachementUse {
  PROFILE = 'PROFILE',
  REQUEST = 'REQUEST',
  CHAT = 'CHAT',
  SUPPORT = 'SUPPORT'
}



export default interface Attachement extends Document {
  user: User;
  fieldname?: string;
  originalname?: string;
  encoding: string;
  mimetype: string,
  size?: number,
  destination?: string,
  filename?: string,
  path?: string,
  buffer: number,
  createdAt: Date,
  use: AttachementUse
}



const schema = new Schema(
  {
    fieldname: {
      type: Schema.Types.String,
      required: false,
      trim: true,
      maxlength: 200
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    originalname: {
      type: Schema.Types.String,
      required: false,
      trim: true,
      maxlength: 200
    },
    encoding: {
      type: Schema.Types.String,
      required: true
    },
    mimetype: {
      type: Schema.Types.String,
      required: true,
    },
    destination: {
      type: Schema.Types.String,
      required: false,
    },
    filename: {
      type: Schema.Types.String,
      required: false,
    },
    path: {
      type: Schema.Types.String,
      required: false,
    },
    buffer: {
      type: Schema.Types.Buffer,
      required: true,
    },
    size: {
      type: Schema.Types.Number,
      required: false,
    },
    createdAt: {
      type: Date,
      required: true
    },
    use: {
      type: Schema.Types.String,
      required: true,
      enum: [AttachementUse.PROFILE, AttachementUse.REQUEST, AttachementUse.SUPPORT, AttachementUse.CHAT]
    },
  },
  {
    versionKey: false,
  },
);


const DOCUMENT_NAME = 'Attachement';
const COLLECTION_NAME = 'attachements';


export const AttachementModel = model<Attachement>(DOCUMENT_NAME, schema, COLLECTION_NAME);
