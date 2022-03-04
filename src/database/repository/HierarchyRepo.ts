import { Types } from 'mongoose';
import Hierarchy, { HierarchyModel } from '../model/Hierarchy';
import Network from '../model/Network';


export default class HierarchyRepo {


  public static update(hierarchy: Hierarchy): Promise<any> {
    hierarchy.updatedAt = new Date();
    return HierarchyModel.updateOne({ _id: hierarchy._id }, { $set: { ...hierarchy } })
      .lean()
      .exec();
  }


  public static findByNetwork(network: Network): Promise<Hierarchy[]> {
    return HierarchyModel.find({ network }).lean<Hierarchy>().exec();
  }
}

