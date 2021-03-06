"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    title: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        maxlength: 300
    },
    description: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        maxlength: 1000
    },
    atachement: {
        // max 16mb
        type: mongoose_1.Schema.Types.Buffer,
        required: false
    },
    status: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        default: "PENDING" /* PENDING */,
        enum: ["CANCELED" /* CANCELED */, "CLOSED" /* CLOSED */, "OVERDUE" /* OVERDUE */, "PENDING" /* PENDING */]
    },
    reply: {
        type: mongoose_1.Schema.Types.String,
        required: false,
        maxlength: 1000,
        default: null
    },
    sender: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    receiver: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    level: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    private: {
        type: mongoose_1.Schema.Types.Boolean,
        required: true,
        default: false,
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: false
    },
    updatedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
        index: true
    },
}, {
    versionKey: false,
});
const DOCUMENT_NAME = 'Request';
const COLLECTION_NAME = 'requests';
exports.RequestModel = mongoose_1.model(DOCUMENT_NAME, schema, COLLECTION_NAME);
//# sourceMappingURL=Request.js.map