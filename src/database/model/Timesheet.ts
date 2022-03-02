import { Schema, model, Document } from 'mongoose';
import User from './User';



export const enum EmployeeStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  OFF = 'OFF'
}


export default interface Timesheet extends Document {
  user: User;
  datetime: Date;
  planned: Array<Date>;
  status: EmployeeStatus;
  elapsed: number;
}


const schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    datetime: {
      type: Date,
      required: true
    },
    planned: {
      type: Schema.Types.Array,
      required: true,
      default: []
    },
    status: {
      type: Date,
      required: true,
      default: EmployeeStatus.ABSENT,
      enum: [EmployeeStatus.ABSENT, EmployeeStatus.OFF, EmployeeStatus.PRESENT]
    },
    elapsed: {
      type: Number,
      required: false
    }
  },
  {
    versionKey: false,
  },
);


const DOCUMENT_NAME = 'Timesheet';
const COLLECTION_NAME = 'timesheet';


export const TimesheetModel = model<Timesheet>(DOCUMENT_NAME, schema, COLLECTION_NAME);
