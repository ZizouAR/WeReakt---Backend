"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
const Note_1 = require("../model/Note");
class NoteRepo {
    static async create(note) {
        note.createdAt = new Date();
        const note_ = await Note_1.NoteModel.create(note);
        return note_.toObject();
    }
    static remove(id) {
        return Note_1.NoteModel.findByIdAndRemove(id).lean().exec();
    }
    static findRecentByNetwork(network) {
        return Note_1.NoteModel.find(network)
            .populate('createdBy', config_1.USER_DETAILS)
            .sort('-createdAt')
            .limit(10)
            .lean()
            .exec();
    }
    static findPrivateByDepartement(departement) {
        return Note_1.NoteModel.find(departement)
            .populate('createdBy', config_1.USER_DETAILS)
            .sort('-createdAt')
            .limit(10)
            .lean()
            .exec();
    }
}
exports.default = NoteRepo;
//# sourceMappingURL=NotesRepo.js.map