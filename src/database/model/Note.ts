import { Schema, model, Document } from 'mongoose';
import Departement from './Department';
import Network from './Network';
import User from './User';


export enum NoteType {
  URGENT = 'URGENT',
  ALERT = 'ALERT',
  DISCLAIMER = 'DISCLAIMER',
  EVENT = 'EVENT',
  IMPORTANT = 'IMPORTANT'
}


export default interface Note extends Document {
  title: string;
  description: string;
  atachement?: Blob; 
  network: Network;
  createdBy: User;
  createdAt: Date;
  private: Boolean;
  departement?: Departement;
  type: NoteType;
  seenBy?: Array<User>;
}

const schema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      required: true,
      maxlength: 300,
      trim: true,
    },
    description: {
      type: Schema.Types.String,
      required: true,
      maxlength: 1000,
    },
    atachement: {
      // max 16mb
      type: Schema.Types.Buffer,
      required: false
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    network: {
      type: Schema.Types.ObjectId,
      ref: 'Network',
      required: true,
      index: true,
    },
    createdAt: {
      type: Date,
      required: true
    },
    Departement: {
      type: Schema.Types.ObjectId,
      ref: 'Departement',
      required: false,
      index: true,
    },
    private: {
      type: Schema.Types.Boolean,
      required: true,
      default: false,
    },
    type: {
      type: Schema.Types.String,
      required: true,
      default: NoteType.DISCLAIMER,
      enum: [NoteType.ALERT, NoteType.DISCLAIMER, NoteType.EVENT, NoteType.IMPORTANT, NoteType.URGENT]
    },
    seenBy: {
      type: Array,
      required: false
    },
  },
  {
    versionKey: false,
  },
);


const DOCUMENT_NAME = 'Note';
const COLLECTION_NAME = 'notes';

export const NoteModel = model<Note>(DOCUMENT_NAME, schema, COLLECTION_NAME);
