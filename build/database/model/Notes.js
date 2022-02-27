"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteModel = void 0;
const mongoose_1 = require("mongoose");
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
    createdAt: {
        type: Date,
        required: true
    },
    public: {
        type: mongoose_1.Schema.Types.Boolean,
        required: true,
        default: false,
    },
    type: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        default: "DISCLAIMER" /* DISCLAIMER */
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
//# sourceMappingURL=Notes.js.map