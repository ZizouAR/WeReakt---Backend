import { Types } from 'mongoose';
import Network, { NetworkModel } from '../model/Network';


export default class NetworkRepo {

  public static async create(network: Network): Promise<Network> {
    network.createdAt = new Date();
    network.updatedAt = new Date();
    
    const net = await NetworkModel.create(network);
    return net.toObject();
  } 

  public static remove(id: Types.ObjectId): Promise<Network | null> {
    return NetworkModel.findByIdAndRemove(id).lean<Network>().exec();
  }

  public static find(id: Types.ObjectId): Promise<Network | null> {
    return NetworkModel.findById(id).lean<Network>().exec();
  }
}
