import ApiKey, { ApiKeyModel } from '../model/ApiKey';

export default class ApiRepo {


  public static async findByKey(key: string): Promise<ApiKey | null> {
    return ApiKeyModel.findOne({ key: key, status: true }).lean<ApiKey>().exec();
  }

  public static async seed(): Promise<ApiKey | null> {
    return ApiKeyModel.insertMany({
      metadata: 'To be used by the xyz vendor',
      key: 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj',
      version: 1,
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
