"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteModel = exports.NoteType = void 0;
const mongoose_1 = require("mongoose");
var NoteType;
(function (NoteType) {
    NoteType["URGENT"] = "URGENT";
    NoteType["ALERT"] = "ALERT";
    NoteType["DISCLAIMER"] = "DISCLAIMER";
    NoteType["EVENT"] = "EVENT";
    NoteType["IMPORTANT"] = "IMPORTANT";
})(NoteType = exports.NoteType || (exports.NoteType = {}));
const schema = new mongoose_1.Schema({
    title: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        maxlength: 300,
        trim: true,
    },
    description: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        maxlength: 1000,
    },
    atachement: {
        // max 16mb
        type: mongoose_1.Schema.Types.Buffer,
        required: false
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    network: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Network',
        required: true,
        index: true,
    },
    createdAt: {
        type: Date,
        required: true
    },
    Departement: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Departement',
        required: false,
        index: true,
    },
    private: {
        type: mongoose_1.Schema.Types.Boolean,
        required: true,
        default: false,
    },
    type: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        default: NoteType.DISCLAIMER,
        enum: [NoteType.ALERT, NoteType.DISCLAIMER, NoteType.EVENT, NoteType.IMPORTANT, NoteType.URGENT]
    },
    seenBy: {
        type: Array,
        required: false
    },
}, {
    versionKey: false,
});
const DOCUMENT_NAME = 'Note';
const COLLECTION_NAME = 'notes';
exports.NoteModel = mongoose_1.model(DOCUMENT_NAME, schema, COLLECTION_NAME);
//# sourceMappingURL=Note.js.map