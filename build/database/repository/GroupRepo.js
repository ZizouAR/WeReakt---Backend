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
    static find(user) {
        return Group_1.GroupModel.find({ members: user }).lean().exec();
    }
    static isGroupChat(_id) {
        return Group_1.GroupModel.findOne({ _id }).lean().exec();
    }
    static isMember(group, user) {
        return group.members.includes(user);
    }
    static update(group) {
        group.updatedAt = new Date();
        return Group_1.GroupModel.findByIdAndUpdate(group._id, { group }).lean().exec();
    }
}
exports.default = GroupRepo;
//# sourceMappingURL=GroupRepo.js.map