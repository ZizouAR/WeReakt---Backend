import { model, Schema, Document } from 'mongoose';
import Job from './Job';
import Role from './Role';



export default interface User extends Document {
  firstname: string;
  lastname: string;
  name?: string;
  tel: number;
  job?: Job;
  password?: string;
  picture?: Buffer;
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
      required: false,
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
    picture: {
      type: Schema.Types.Buffer,
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
