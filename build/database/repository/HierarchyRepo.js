"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Hierarchy_1 = require("../model/Hierarchy");
class HierarchyRepo {
    static update(hierarchy) {
        hierarchy.updatedAt = new Date();
        return Hierarchy_1.HierarchyModel.updateOne({ _id: hierarchy._id }, { $set: { ...hierarchy } })
            .lean()
            .exec();
    }
    static findByNetwork(id) {
        return Hierarchy_1.HierarchyModel.findById(id).lean().exec();
    }
}
exports.default = HierarchyRepo;
//# sourceMappingURL=HierarchyRepo.js.map