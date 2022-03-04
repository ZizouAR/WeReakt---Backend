import { Schema, model, Document } from 'mongoose';


export const enum RoleCode {
  MODERATOR = 'MODERATOR',
  ADMIN = 'ADMIN',
  OWNER = 'OWNER',
}

export default interface Role extends Document {
  code: string;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema(
  {
    code: {
      type: Schema.Types.String,
      required: true,
      enum: [RoleCode.OWNER, RoleCode.ADMIN, RoleCode.MODERATOR],
    },
    status: {
      type: Schema.Types.Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      required: true,
      select: false,
    },
    updatedAt: {
      type: Date,
      required: true,
      select: false,
    },
  },
  {
    versionKey: false,
  },
);


const DOCUMENT_NAME = 'Role';
const COLLECTION_NAME = 'roles';

export const RoleModel = model<Role>(DOCUMENT_NAME, schema, COLLECTION_NAME);
