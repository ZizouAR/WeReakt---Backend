import { DocumentDefinition, Types } from 'mongoose';
import { USER_DETAILS } from '../../config';
import { ResponseStatus } from '../model/Request';
import Task, { TaskModel } from '../model/Task';
import User from '../model/User';


export default class TaskRepo {


  public static async create(task: Task): Promise<Task> {
    task.createdAt = new Date();
    task.status = ResponseStatus.PENDING;

    const tsk = await TaskModel.create(task);
    return tsk.toObject();
  } 


  public static remove(id: Types.ObjectId): Promise<Task | null> {
    return TaskModel.findByIdAndRemove(id).lean<Task>().exec();
  }


  public static updateStatus(task: Task): Promise<DocumentDefinition<Task> | null> {
    return TaskModel.findByIdAndUpdate(task._id, { status: task.status, updatedAt: new Date() })
      .lean()
      .exec();
  }

  public static find(doer: User): Promise<Task[]> {
    return TaskModel.find(doer)
    .populate('from', USER_DETAILS)
    .sort('-createdAt')
    .lean<Task>()
    .exec();
  }
}

