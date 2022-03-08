"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const ApiError_1 = require("../../core/ApiError");
const Meeting_1 = require("../model/Meeting");
class MeetingRepo {
    static async create(meeting) {
        meeting.createdAt = new Date();
        meeting.expiresAt = new Date();
        // add duration to datetime
        meeting.expiresAt.setMinutes(meeting.createdAt.getMinutes() + 30);
        if (meeting.guests.length > 0)
            throw new ApiError_1.InternalError('Meeting should have guests.');
        const msg = await Meeting_1.MeetingModel.create(meeting);
        return msg.toObject();
    }
    static remove(id) {
        return Meeting_1.MeetingModel.findByIdAndRemove(id).lean().exec();
    }
    static update(meeting) {
        meeting.updatedAt = new Date();
        return Meeting_1.MeetingModel.updateOne({ _id: meeting._id }, { $set: { ...meeting } })
            .lean()
            .exec();
    }
    static findById(id) {
        return Meeting_1.MeetingModel.findById(id).lean().exec();
    }
    static async isCreator(user, meeting_id) {
        var meeting = await this.findById(meeting_id);
        return user._id == (meeting === null || meeting === void 0 ? void 0 : meeting.createdBy);
    }
    static findRecent(User) {
        return Meeting_1.MeetingModel.find({ guests: User })
            .populate('createdBy', config_1.USER_DETAILS)
            .sort('-createdAt')
            .limit(10)
            .lean()
            .exec();
    }
}
exports.default = MeetingRepo;
//# sourceMappingURL=MeetingRepo.js.map