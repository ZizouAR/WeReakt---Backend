import { Schema, model, Document } from 'mongoose';
import User from './User';


export const enum Permission {
  READ_WRITE_EDIT = 'READ_WRITE_EDIT',
  READ_WRITE = 'READ_WRITE',
  READ = 'READ',
}


export default interface Group extends Document {
  name: string;
  members: User[];
  private: boolean;
  createdAt: Date;
  createdBy: User;
  updatedAt?: Date;
  updatedBy?: User;
}

const schema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      maxlength: 300
    },
    members: {
      type: Schema.Types.Array,
      required: true
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
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
      index: true
    }
  },
  {
    versionKey: false,
  },
);



const DOCUMENT_NAME = 'Group';
const COLLECTION_NAME = 'groups';


export const GroupModel = model<Group>(DOCUMENT_NAME, schema, COLLECTION_NAME);
