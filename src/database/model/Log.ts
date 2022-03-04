import { Schema, model, Document } from 'mongoose';
import User from './User';



export const enum Action {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  PASSWORD_RESET = 'PASSWORD_RESET',
  PROFILE_UPDATE = 'PROFILE_UPDATE',
  NETWORK_UPDATE = 'NETWORK_UPDATE',
  CREATE_TICKET = 'CREATE_TICKET',
  CLOCKED = 'CLOCKED'
}


export default interface Log extends Document {
  user: User;
  action: string;
  ipAddress: string;
  macAddress?: string;
  device?: string;
  device_id?: string;
  browser: string;
  system?: string;
  system_v?: string;
  carrier?: string;
  brand?: string;
  user_agent: string;
  isEmulator?: boolean;
  isLocationEnabled: boolean;
  createdAt: Date;
}

const schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    action: {
      type: Schema.Types.String,
      required: true
    },
    ipAddress: {
      type: Schema.Types.String,
      required: true
    },
    macAddress: {
      type: Schema.Types.String,
      required: false
    },
    device: {
      type: Schema.Types.String,
      required: false
    },
    device_id: {
      type: Schema.Types.String,
      required: false
    },
    browser: {
      type: Schema.Types.String,
      required: true
    },
    system: {
      type: Schema.Types.String,
      required: false
    },
    system_v: {
      type: Schema.Types.String,
      required: false
    },
    carrier: {
      type: Schema.Types.String,
      required: false
    },
    brand: {
      type: Schema.Types.String,
      required: false
    },
    user_agent: {
      type: Schema.Types.String,
      required: true
    },
    isEmulator: {
      type: Schema.Types.Boolean,
      required: false
    },
    isLocationEnabled: {
      type: Schema.Types.Boolean,
      required: true
    },
    createdAt: {
      type: Date,
      required: true
    }
  },
  {
    versionKey: false,
  },
);


const DOCUMENT_NAME = 'Log';
const COLLECTION_NAME = 'logs';


export const LogModel = model<Log>(DOCUMENT_NAME, schema, COLLECTION_NAME);
