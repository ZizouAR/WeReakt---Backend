import { Schema, model, Document } from 'mongoose';
import User from './User';



export const enum MeetingStatus {
  PENDING = 'PENDING',
  CANCELED = 'CANCELED',
  OVERDUE = 'OVERDUE',
  DONE = 'DONE'
}


export default interface Meeting extends Document {
  title: string;
  datetime: Date;
  guests: Array<User>;
  createdBy: User;
  status: MeetingStatus;
  createdAt: Date;
  updatedAt?: Date;
}

const schema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      required: true,
      maxlength: 300
    },
    datetime: {
      type: Date,
      required: true
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    guests: {
      type: Schema.Types.Array,
      required: true
    },
    createdAt: {
      type: Date,
      required: true
    },
    updatedAt: {
      type: Date,
      required: false
    }
  },
  {
    versionKey: false,
  },
);


const DOCUMENT_NAME = 'Meeting';
const COLLECTION_NAME = 'meetings';


export const MeetingModel = model<Meeting>(DOCUMENT_NAME, schema, COLLECTION_NAME);
