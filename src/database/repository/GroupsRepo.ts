import { Types } from 'mongoose';
import Group, { GroupModel } from '../model/Group';
import User from '../model/User';


export default class GroupRepo {

  public static async create(group: Group): Promise<Group> {
    group.createdAt = new Date();
    group.updatedAt = new Date();
    
    const grp = await GroupModel.create(group);
    return grp.toObject();
  } 

  public static remove(id: Types.ObjectId): Promise<Group | null> {
    return GroupModel.findByIdAndRemove(id).lean<Group>().exec();
  }

  public static findByGroup(group: Group): Promise<Group[]> {
    return GroupModel.find({ group }).lean<Group>().exec();
  }


  public static isGroupChat(_id: Types.ObjectId): Promise<Group | null> {
    return GroupModel.findOne({ _id }).lean<Group>().exec();
  }


  public static isMember(group: Group, user: User): Boolean {
    return group.members.includes(user);
  }
}
