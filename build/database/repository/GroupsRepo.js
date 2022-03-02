"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Group_1 = require("../model/Group");
class GroupRepo {
    static async create(group) {
        group.createdAt = new Date();
        group.updatedAt = new Date();
        const grp = await Group_1.GroupModel.create(group);
        return grp.toObject();
    }
    static remove(id) {
        return Group_1.GroupModel.findByIdAndRemove(id).lean().exec();
    }
    static findByGroup(group) {
        return Group_1.GroupModel.find({ group }).lean().exec();
    }
}
exports.default = GroupRepo;
//# sourceMappingURL=GroupsRepo.js.map