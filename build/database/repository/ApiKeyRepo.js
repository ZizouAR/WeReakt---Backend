"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiKey_1 = require("../model/ApiKey");
class ApiRepo {
    static async findByKey(key) {
        return ApiKey_1.ApiKeyModel.findOne({ key: key, status: true }).lean().exec();
    }
    static async insert() {
        return ApiKey_1.ApiKeyModel.insertMany({
            metadata: 'To be used by the xyz vendor',
            key: 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj',
            version: 1,
            status: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }
}
exports.default = ApiRepo;
//# sourceMappingURL=ApiKeyRepo.js.map