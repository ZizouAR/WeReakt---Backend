"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    message: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        maxlength: 1000,
        trim: true,
        default: ""
    },
    atachement: {
        // max 16mb
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Atachement',
        required: false,
        index: true,
    },
    sender: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    receiver: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        index: true,
    },
    isGroupeChat: {
        type: mongoose_1.Schema.Types.Boolean,
        required: true,
        default: false,
    },
    type: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        default: "TEXT" /* TEXT */
    },
    seen: {
        type: mongoose_1.Schema.Types.Boolean,
        required: true,
        default: true,
    },
    createdAt: {
        type: Date,
        required: true
    },
    seenBy: {
        type: Array,
        required: false
    },
}, {
    versionKey: false,
});
const DOCUMENT_NAME = 'Message';
const COLLECTION_NAME = 'messages';
exports.MessageModel = mongoose_1.model(DOCUMENT_NAME, schema, COLLECTION_NAME);
//# sourceMappingURL=Message.js.map