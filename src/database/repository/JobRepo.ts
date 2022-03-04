import { Types } from 'mongoose';
import Departement from '../model/Department';
import Job, { JobModel } from '../model/Job';
import Network from '../model/Network';
import DepartementRepo from './DepartementRepo';


export default class JobRepo {


  public static async create(job: Job): Promise<Job> {
    const job_ = await JobModel.create(job);
    return job_.toObject();
  }


  public static remove(id: Types.ObjectId): Promise<Job | null> {
    return JobModel.findByIdAndRemove(id).lean<Job>().exec();
  }


  public static findByDepartement(departement: Departement): Promise<Job[]> {
    return JobModel.find(departement).lean<Job>().exec();
  }

  
  public static async findByNetwork(network: Network): Promise<Job[]> {
    const departements = await DepartementRepo.findByNetwork(network);

    /* '_id': { $in: [
          mongoose.Types.ObjectId('4ed3ede8844f0f351100000c'),
          mongoose.Types.ObjectId('4ed3f117a844e0471100000d'), 
          mongoose.Types.ObjectId('4ed3f18132f50c491100000e')
    ] */

    return JobModel.find({
      'departement': { $in: departements }}).lean<Job>().exec();
  }
}

