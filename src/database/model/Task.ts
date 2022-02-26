import { Schema, model, Document } from 'mongoose';
import User from './User';



export const enum TaskStatus {
  PENDING = 'PENDING',
  CANCELED = 'CANCELED',
  OVERDUE = 'OVERDUE',
  DONE = 'DONE'
}


export default interface Task extends Document {
  title: string;
  description: string;
  doer: User;
  from: User;
  status: TaskStatus;
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
    description: {
      type: Schema.Types.String,
      required: true,
      maxlength: 1000
    },
    doer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    status: {
      type: Schema.Types.String,
      required: true,
      default: TaskStatus.PENDING
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


const DOCUMENT_NAME = 'Task';
const COLLECTION_NAME = 'tasks';


export const TaskModel = model<Task>(DOCUMENT_NAME, schema, COLLECTION_NAME);
