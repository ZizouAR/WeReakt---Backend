"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Message_1 = require("../model/Message");
class MessageRepo {
    static async create(message) {
        message.createdAt = new Date();
        const msg = await Message_1.MessageModel.create(message);
        return msg.toObject();
    }
    static remove(id) {
        return Message_1.MessageModel.findByIdAndRemove(id).lean().exec();
    }
    static read(sender, receiver) {
        return Message_1.MessageModel.find(sender, receiver)
            .populate('sender', this.USER_DETAILS)
            .sort('-createdAt')
            .limit(100)
            .lean()
            .exec();
    }
}
exports.default = MessageRepo;
MessageRepo.USER_DETAILS = 'name profilePicUrl';
//# sourceMappingURL=MessageRepo.js.map