"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Department_1 = require("../model/Department");
class DepartementRepo {
    static async create(departement) {
        departement.createdAt = new Date();
        const newDepartement = await Department_1.DepartementModel.create(departement);
        return newDepartement.toObject();
    }
    static remove(id) {
        return Department_1.DepartementModel.findByIdAndRemove(id).lean().exec();
    }
    static findByNetwork(network) {
        return Department_1.DepartementModel.find({ network }).lean().exec();
    }
}
exports.default = DepartementRepo;
//# sourceMappingURL=DepartementRepo.js.map