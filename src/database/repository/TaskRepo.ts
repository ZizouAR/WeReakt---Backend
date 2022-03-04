import { Types } from 'mongoose';
import { USER_DETAILS } from '../../config';
import Task, { TaskModel } from '../model/Task';
import User from '../model/User';


export default class TaskRepo {


  public static async create(task: Task): Promise<Task> {
    task.createdAt = new Date();
    const tsk = await TaskModel.create(task);
    return tsk.toObject();
  } 


  public static remove(id: Types.ObjectId): Promise<Task | null> {
    return TaskModel.findByIdAndRemove(id).lean<Task>().exec();
  }


  public static updateStatus(task: Task): Promise<any> {
    return TaskModel.findByIdAndUpdate(task._id, { status: task.status, updatedAt: new Date() })
      .lean()
      .exec();
  }

  public static read(doer: User, from: string): Promise<Task[]> {
    return TaskModel.find(doer, from)
    .populate('from', USER_DETAILS)
    .sort('-createdAt')
    .lean<Task>()
    .exec();
  }
}

