"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const Log_1 = require("../model/Log");
class LogRepo {
    static async create(log) {
        log.createdAt = new Date();
        const log_ = await Log_1.LogModel.create(log);
        return log_.toObject();
    }
    static clearOld(user, gte) {
        return Log_1.LogModel.deleteMany({ createdAt: { $gte: gte }, user }).lean().exec();
    }
    static async isLarge(user) {
        const logs = await this.findByUser(user);
        const isLarge = Object.keys(logs).length > 200;
        // keep recent 200 row
        if (Object.keys(logs).length > 200)
            this.clearOld(user, logs[200].createdAt);
        return isLarge;
    }
    static findByUser(user) {
        return Log_1.LogModel.find(user)
            .populate('user', config_1.USER_DETAILS)
            .sort('-createdAt')
            .limit(201)
            .lean()
            .exec();
    }
}
exports.default = LogRepo;
//# sourceMappingURL=LogRepo.js.map