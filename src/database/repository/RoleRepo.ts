import Role, { RoleCode, RoleModel } from '../model/Role';

export default class RoleRepo {


  public static findByCode(code: string): Promise<Role | null> {
    return RoleModel.findOne({ code: code, status: true }).lean<Role>().exec();
  }

  public static seed() {
    return RoleModel.insertMany([
      { code: RoleCode.ADMIN, status: true, createdAt: new Date(), updatedAt: new Date() },
      { code: RoleCode.MODERATOR, status: true, createdAt: new Date(), updatedAt: new Date() },
      { code: RoleCode.OWNER, status: true, createdAt: new Date(), updatedAt: new Date() }
    ]);
  }
}
