import User, { UserModel } from '../model/User';
import Role, { RoleModel } from '../model/Role';
import { InternalError } from '../../core/ApiError';
import { Types } from 'mongoose';
import KeystoreRepo from './KeystoreRepo';
import Keystore from '../model/Keystore';

export default class UserRepo {
  // contains critical information of the user
  public static findById(id: Types.ObjectId): Promise<User | null> {
    return UserModel.findOne({ _id: id, verified: true })
      .select('+tel +password +roles')
      .populate({
        path: 'roles',
        match: { verified: true },
      })
      .lean<User>()
      .exec();
  }

  public static findByPhone(tel: number): Promise<User | null> {
    return UserModel.findOne({ tel, verified: true })
      .select('+tel +password +roles')
      .populate({
        path: 'roles',
        match: { verified: true },
        select: { code: 1 },
      })
      .lean<User>()
      .exec();
  }

  public static findProfileById(id: Types.ObjectId): Promise<User | null> {
    return UserModel.findOne({ _id: id, verified: true })
      .select('+roles')
      .populate({
        path: 'roles',
        match: { verified: true },
        select: { code: 1 },
      })
      .lean<User>()
      .exec();
  }

  public static findPublicProfileById(id: Types.ObjectId): Promise<User | null> {
    return UserModel.findOne({ _id: id, verified: true }).lean<User>().exec();
  }

  public static async create(
    user: User,
    accessTokenKey: string,
    refreshTokenKey: string,
    roleCode: string,
  ): Promise<{ user: User; keystore: Keystore }> {

    const role = await RoleModel.findOne({ code: roleCode })
      .select('+tel +password')
      .lean<Role>()
      .exec();
    if (!role) throw new InternalError('Role must be defined');

    user.roles = [role._id];
    user.createdAt = user.updatedAt =  new Date();
    user.name = user.firstname + " " + user.lastname;
    // check phone number
    //xxx

    const createdUser = await UserModel.create(user);
    const keystore = await KeystoreRepo.create(createdUser._id, accessTokenKey, refreshTokenKey);
    return { user: createdUser.toObject(), keystore: keystore };
  }

  public static async update(
    user: User,
    accessTokenKey: string,
    refreshTokenKey: string,
  ): Promise<{ user: User; keystore: Keystore }> {
    user.updatedAt = new Date();
    await UserModel.updateOne({ _id: user._id }, { $set: { ...user } })
      .lean()
      .exec();
    const keystore = await KeystoreRepo.create(user._id, accessTokenKey, refreshTokenKey);
    return { user: user, keystore: keystore };
  }

  public static updateInfo(user: User): Promise<any> {
    user.updatedAt = new Date();
    return UserModel.updateOne({ _id: user._id }, { $set: { ...user } })
      .lean()
      .exec();
  }
}
