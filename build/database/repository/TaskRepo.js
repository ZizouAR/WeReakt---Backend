"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const Task_1 = require("../model/Task");
class TaskRepo {
    static async create(task) {
        task.createdAt = new Date();
        task.status = "PENDING" /* PENDING */;
        const tsk = await Task_1.TaskModel.create(task);
        return tsk.toObject();
    }
    static remove(id) {
        return Task_1.TaskModel.findByIdAndRemove(id).lean().exec();
    }
    static updateStatus(task) {
        return Task_1.TaskModel.findByIdAndUpdate(task._id, { status: task.status, updatedAt: new Date() })
            .lean()
            .exec();
    }
    static find(doer) {
        return Task_1.TaskModel.find(doer)
            .populate('from', config_1.USER_DETAILS)
            .sort('-createdAt')
            .lean()
            .exec();
    }
}
exports.default = TaskRepo;
//# sourceMappingURL=TaskRepo.js.map