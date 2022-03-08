import { Schema, model, Document } from 'mongoose';
import Attachement from './Attachement';
import User from './User';



export default interface Message extends Document {
  message: string;
  attachement?: Attachement; 
  sender: User;
  receiver: string;
  isGroupeChat?: boolean;
  hasAttachement?: boolean;
  seen?: boolean;
  seenBy?: User[];
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
    attachement: {
      // max 16mb
      type: Schema.Types.ObjectId,
      ref: 'Attachement',
      required: false,
      index: true,
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
    hasAttachement: {
      type: Schema.Types.Boolean,
      required: true,
      default: false
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
