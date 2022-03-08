import { Types } from 'mongoose';
import Hierarchy, { HierarchyModel } from '../model/Hierarchy';


export default class HierarchyRepo {


  public static update(hierarchy: Hierarchy): Promise<any> {
    hierarchy.updatedAt = new Date();
    return HierarchyModel.updateOne({ _id: hierarchy._id }, { $set: { ...hierarchy } })
      .lean()
      .exec();
  }


  public static findByNetwork(id: Types.ObjectId): Promise<Hierarchy | null> {
    return HierarchyModel.findById(id).lean<Hierarchy>().exec();
  }
}

