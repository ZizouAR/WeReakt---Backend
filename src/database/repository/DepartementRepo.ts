import { Types } from 'mongoose';
import Departement, { DepartementModel } from '../model/Department';
import Network from '../model/Network';


export default class DepartementRepo {

  public static async create(departement: Departement): Promise<Departement> {
    departement.createdAt = new Date();
    const newDepartement = await DepartementModel.create(departement);
    return newDepartement.toObject();
  } 

  public static remove(id: Types.ObjectId): Promise<Departement | null> {
    return DepartementModel.findByIdAndRemove(id).lean<Departement>().exec();
  }

  public static findByNetwork(network: Network): Promise<Departement[]> {
    return DepartementModel.find({ network }).lean<Departement>().exec();
  }
}
