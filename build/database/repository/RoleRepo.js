"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Role_1 = require("../model/Role");
class RoleRepo {
    static findByCode(code) {
        return Role_1.RoleModel.findOne({ code: code, status: true }).lean().exec();
    }
    static seed() {
        return Role_1.RoleModel.insertMany([
            { code: "ADMIN" /* ADMIN */, status: true, createdAt: new Date(), updatedAt: new Date() },
            { code: "MODERATOR" /* MODERATOR */, status: true, createdAt: new Date(), updatedAt: new Date() },
            { code: "OWNER" /* OWNER */, status: true, createdAt: new Date(), updatedAt: new Date() }
        ]);
    }
}
exports.default = RoleRepo;
//# sourceMappingURL=RoleRepo.js.map