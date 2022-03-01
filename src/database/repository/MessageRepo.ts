import { Types } from 'mongoose';
import Message, { MessageModel } from '../model/Message';
import User from '../model/User';


export default class MessageRepo {

  private static USER_DETAILS = 'name picture';

  public static async create(message: Message): Promise<Message> {
    message.createdAt = new Date();
    const msg = await MessageModel.create(message);
    return msg.toObject();
  } 


  public static remove(id: Types.ObjectId): Promise<Message | null> {
    return MessageModel.findByIdAndRemove(id).lean<Message>().exec();
  }


  public static read(sender: User, receiver: string): Promise<Message[]> {
    return MessageModel.find(sender, receiver)
    .populate('sender', this.USER_DETAILS)
    .sort('-createdAt')
    .limit(100)
    .lean<Message>()
    .exec();
  }
}

