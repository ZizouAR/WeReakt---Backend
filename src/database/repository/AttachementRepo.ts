import { Types } from 'mongoose';
import Attachement, { AttachementModel, AttachementUse } from '../model/Attachement';

const sharp = require("sharp");


export default class AttachementRepo {

  public static async upload(attachement: Attachement): Promise<Attachement> {

    attachement.createdAt = new Date();

    // @resize 250x250
    if(attachement.use == AttachementUse.PROFILE){
      attachement.buffer = await sharp(attachement.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    }

    const Attach = await AttachementModel.create(attachement);
    return Attach.toObject();
  } 

  public static remove(id: Types.ObjectId): Promise<Attachement | null> {
    return AttachementModel.findByIdAndRemove(id).lean<Attachement>().exec();
  }

  public static findById(attachement: Attachement): Promise<Attachement[]> {
    return AttachementModel.find({ attachement }).lean<Attachement>().exec();
  }
}
