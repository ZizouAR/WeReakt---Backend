import { Schema, model, Document } from 'mongoose';
import User from './User';



export enum MeetingStatus {
  ON_SCHEDULE = "ON SCHEDULE",
  PENDING = 'PENDING',
  CANCELED = 'CANCELED',
  OVERDUE = 'OVERDUE',
  EXPIRED = 'EXPIRED'
}


export default interface Meeting extends Document {
  title: string;
  datetime: Date;
  duration: Number;
  guests: User[];
  createdBy: User;
  status: MeetingStatus;
  createdAt: Date;
  updatedAt?: Date;
  expiresAt?: Date;
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
    duration: {
      // minutes
      type: Schema.Types.Number,
      required: true
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    guests: {
      type: [Schema.Types.ObjectId],
      required: true
    },
    createdAt: {
      type: Date,
      required: true
    },
    updatedAt: {
      type: Date,
      required: false
    },
    expiresAt: {
      type: Date,
      required: false
    },
    status: {
      type: Schema.Types.String,
      required: true,
      default: MeetingStatus.ON_SCHEDULE,
      enum: [MeetingStatus.CANCELED, MeetingStatus.EXPIRED, MeetingStatus.OVERDUE, MeetingStatus.PENDING, MeetingStatus.ON_SCHEDULE]
    },
  },
  {
    versionKey: false,
  },
);


const DOCUMENT_NAME = 'Meeting';
const COLLECTION_NAME = 'meetings';


export const MeetingModel = model<Meeting>(DOCUMENT_NAME, schema, COLLECTION_NAME);
