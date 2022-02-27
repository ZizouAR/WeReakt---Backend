import { Schema, model, Document } from 'mongoose';
import User from './User';


export const enum MessageType {
  TEXT = 'TEXT',
  POKE = 'POKE',
  AUDIO = 'AUDIO',
  VIDEO = 'VIDEO',
  IMAGE = 'IMAGE',
  FILE = 'FILE',
}


export default interface Message extends Document {
  message: string;
  atachement?: Blob; 
  sender: User;
  receiver: string;
  isGroupeChat: boolean;
  type: MessageType;
  seen: boolean;
  seenBy: Array<User>;
  createdAt: Date;
}

const schema = new Schema(
  {
    message: {
      type: Schema.Types.String,
      required: true,
      maxlength: 1000,
      trim: true,
      default: ""
    },
    atachement: {
      // max 16mb
      type: Schema.Types.Buffer,
      required: false
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    isGroupeChat: {
      type: Schema.Types.Boolean,
      required: true,
      default: false,
    },
    type: {
      type: Schema.Types.String,
      required: true,
      default: MessageType.TEXT
    },
    seen: {
      type: Schema.Types.Boolean,
      required: true,
      default: true,
    },
    createdAt: {
      type: Date,
      required: true
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


const DOCUMENT_NAME = 'Message';
const COLLECTION_NAME = 'messages';

export const MessageModel = model<Message>(DOCUMENT_NAME, schema, COLLECTION_NAME);
