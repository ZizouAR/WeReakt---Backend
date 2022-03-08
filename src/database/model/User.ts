import { model, Schema, Document } from 'mongoose';
import Job from './Job';
import Role from './Role';
import Attachement from './Attachement';
import Network from './Network';



export default interface User extends Document {
  firstname?: string;
  lastname?: string;
  name?: string;
  network: Network;
  tel: number;
  job: Job;
  password?: string;
  otp?: string;
  picture?: Attachement;
  roles: Role[];
  verified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}


const schema = new Schema(
  {
    firstname: {
      type: Schema.Types.String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    lastname: {
      type: Schema.Types.String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    name: {
      type: Schema.Types.String,
      required: false,
      trim: true,
      unique: true,
      maxlength: 100,
    },
    job: {
      type: Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
      index: true,
    },
    network: {
      type: Schema.Types.ObjectId,
      ref: 'Network',
      required: true,
      index: true,
    },
    tel: {
      type: Schema.Types.Number,
      required: true,
      unique: true,
      trim: true,
      select: false,
    },
    password: {
      type: Schema.Types.String,
      select: false,
    },
    otp: {
      type: Schema.Types.String,
      select: false,
      required: false,
    },
    picture: {
      type: Schema.Types.ObjectId,
      ref: 'Attachement',
      index: true,
      required: false,
      trim: true,
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
    verified: {
      type: Schema.Types.Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      required: true
    },
    updatedAt: {
      type: Date,
      required: true
    },
  },
  {
    versionKey: false,
  },
);


const DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'users';


export const UserModel = model<User>(DOCUMENT_NAME, schema, COLLECTION_NAME);
