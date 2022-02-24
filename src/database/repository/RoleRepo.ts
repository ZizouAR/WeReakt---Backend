import Role, { RoleModel } from '../model/Role';

export default class RoleRepo {


  public static findByCode(code: string): Promise<Role | null> {
    return RoleModel.findOne({ code: code, status: true }).lean<Role>().exec();
  }

  public static seed() {
    return RoleModel.insertMany([
      { code: 'LEARNER', status: true, createdAt: new Date(), updatedAt: new Date() },
      { code: 'WRITER', status: true, createdAt: new Date(), updatedAt: new Date() },
      { code: 'EDITOR', status: true, createdAt: new Date(), updatedAt: new Date() },
      { code: 'ADMIN', status: true, createdAt: new Date(), updatedAt: new Date() },
    ]);
  }
}
