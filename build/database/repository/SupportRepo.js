"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Support_1 = require("../model/Support");
class SupportRepo {
    static async create(req) {
        req.createdAt = new Date();
        const request = await Support_1.SupportModel.create(req);
        return request.toObject();
    }
    static update(support) {
        return Support_1.SupportModel.findByIdAndUpdate(support._id, { support })
            .lean()
            .exec();
    }
    static find(user) {
        return Support_1.SupportModel.find(user)
            .sort('-createdAt')
            .lean()
            .exec();
    }
}
exports.default = SupportRepo;
//# sourceMappingURL=SupportRepo.js.map