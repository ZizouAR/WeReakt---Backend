import { Types } from 'mongoose';
import { USER_DETAILS } from '../../config';
import Departement from '../model/Department';
import Network from '../model/Network';
import Note, { NoteModel } from '../model/Note';


export default class NoteRepo {


  public static async create(note: Note): Promise<Note> {
    note.createdAt = new Date();
    
    const note_ = await NoteModel.create(note);
    return note_.toObject();
  } 



  public static remove(id: Types.ObjectId): Promise<Note | null> {
    return NoteModel.findByIdAndRemove(id).lean<Note>().exec();
  }



  public static findRecentByNetwork(network: Network): Promise<Note[]> {
    return NoteModel.find(network)
    .populate('createdBy', USER_DETAILS)
    .sort('-createdAt')
    .limit(10)
    .lean<Note>()
    .exec();
  }



  public static findPrivateByDepartement(departement: Departement): Promise<Note[]> {
    return NoteModel.find(departement)
    .populate('createdBy', USER_DETAILS)
    .sort('-createdAt')
    .limit(10)
    .lean<Note>()
    .exec();
  }
}

