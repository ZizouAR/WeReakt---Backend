import { Types } from 'mongoose';
import { USER_DETAILS } from '../../config';
import { InternalError } from '../../core/ApiError';
import Meeting, { MeetingModel, MeetingStatus } from '../model/Meeting';
import User from '../model/User';


export default class MeetingRepo {

  
  public static async create(meeting: Meeting): Promise<Meeting> {
    meeting.createdAt = new Date();
    meeting.expiresAt = new Date(); 

    // add duration to datetime
    meeting.expiresAt.setMinutes(meeting.createdAt.getMinutes() + 30);

    if (meeting.guests.length > 0) throw new InternalError('Meeting should have guests.');
    
    const msg = await MeetingModel.create(meeting);
    return msg.toObject();
  } 



  public static remove(id: Types.ObjectId): Promise<Meeting | null> {
    return MeetingModel.findByIdAndRemove(id).lean<Meeting>().exec();
  }



  public static update(meeting: Meeting): Promise<any> {
    meeting.updatedAt = new Date();
    return MeetingModel.updateOne({ _id: meeting._id }, { $set: { ...meeting } })
      .lean()
      .exec();
  }



  public static findById(id: Types.ObjectId): Promise<Meeting | null> {
    return MeetingModel.findById(id).lean<Meeting>().exec();
  }



  public static async isCreator(user: User, meeting_id: Types.ObjectId): Promise<Boolean> {
    var meeting = await this.findById(meeting_id);
    return user._id == meeting?.createdBy;
  }



  public static findRecent(User: User): Promise<Meeting[]> {
    return MeetingModel.find({ guests: User })
    .populate('createdBy', USER_DETAILS)
    .sort('-createdAt')
    .limit(10)
    .lean<Meeting>()
    .exec();
  }

}

