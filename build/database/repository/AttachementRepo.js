"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Attachement_1 = require("../model/Attachement");
const sharp = require("sharp");
class AttachementRepo {
    static async upload(attachement) {
        attachement.createdAt = new Date();
        // @resize 250x250
        if (attachement.as == "PROFILE" /* PROFILE */) {
            attachement.buffer = await sharp(attachement.buffer)
                .resize({ width: 250, height: 250 })
                .png()
                .toBuffer();
        }
        const Attach = await Attachement_1.AttachementModel.create(attachement);
        return Attach.toObject();
    }
    static remove(id) {
        return Attachement_1.AttachementModel.findByIdAndRemove(id).lean().exec();
    }
    static findById(attachement) {
        return Attachement_1.AttachementModel.find({ attachement }).lean().exec();
    }
}
exports.default = AttachementRepo;
//# sourceMappingURL=AttachementRepo.js.map