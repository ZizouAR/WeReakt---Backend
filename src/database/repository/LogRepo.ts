import { USER_DETAILS } from '../../config';
import Log, { LogModel } from '../model/Log';
import User from '../model/User';


export default class LogRepo {


  public static async create(log: Log): Promise<Log> {
    log.createdAt = new Date();
    const log_ = await LogModel.create(log);
    return log_.toObject();
  }


  public static clearOld(user: User, gte: Date): Promise<Log | null> {
    return LogModel.deleteMany({ createdAt: { $gte: gte }, user }).lean<Log>().exec();
  }


  public static async isLarge(user: User): Promise<Boolean> {
    const logs = await this.findByUser(user);
    const isLarge = Object.keys(logs).length > 200;

    // keep recent 200 row
    if(Object.keys(logs).length > 200) this.clearOld(user, logs[200].createdAt)
    return isLarge;
  }


  public static findByUser(user: User): Promise<Log[]> {
    return LogModel.find(user)
    .populate('user', USER_DETAILS)
    .sort('-createdAt')
    .limit(201)
    .lean<Log>()
    .exec();
  }

}

