"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachementModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    fieldname: {
        type: mongoose_1.Schema.Types.String,
        required: false,
        trim: true,
        maxlength: 200
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    originalname: {
        type: mongoose_1.Schema.Types.String,
        required: false,
        trim: true,
        maxlength: 200
    },
    encoding: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    mimetype: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    destination: {
        type: mongoose_1.Schema.Types.String,
        required: false,
    },
    filename: {
        type: mongoose_1.Schema.Types.String,
        required: false,
    },
    path: {
        type: mongoose_1.Schema.Types.String,
        required: false,
    },
    buffer: {
        type: mongoose_1.Schema.Types.Buffer,
        required: true,
    },
    size: {
        type: mongoose_1.Schema.Types.Number,
        required: false,
    },
    createdAt: {
        type: Date,
        required: true
    },
    as: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        enum: ["PROFILE" /* PROFILE */, "REQUEST" /* REQUEST */, "SUPPORT" /* SUPPORT */, "MESSAGE" /* MESSAGE */]
    },
}, {
    versionKey: false,
});
const DOCUMENT_NAME = 'Attachement';
const COLLECTION_NAME = 'attachements';
exports.AttachementModel = mongoose_1.model(DOCUMENT_NAME, schema, COLLECTION_NAME);
//# sourceMappingURL=Attachement.js.map