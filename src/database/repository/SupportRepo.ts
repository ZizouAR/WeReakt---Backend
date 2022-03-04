import { USER_DETAILS } from '../../config';
import Support, { SupportModel } from '../model/Support';
import User from '../model/User';


export default class SupportRepo {


  public static async create(req: Support): Promise<Support> {
    req.createdAt = new Date();
    const request = await SupportModel.create(req);
    return request.toObject();
  } 


  public static update(support: Support): Promise<any> {
    return SupportModel.findByIdAndUpdate(support._id, { support })
      .lean()
      .exec();
  }


  public static find(user: User): Promise<Support[]> {
    return SupportModel.find(user)
    .sort('-createdAt')
    .lean<Support>()
    .exec();
  }
}

