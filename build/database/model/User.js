"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    firstname: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    lastname: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    name: {
        type: mongoose_1.Schema.Types.String,
        required: false,
        trim: true,
        unique: true,
        maxlength: 100,
    },
    job: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Job',
        required: false,
        index: true,
    },
    tel: {
        type: mongoose_1.Schema.Types.Number,
        required: true,
        unique: true,
        trim: true,
        select: false,
    },
    password: {
        type: mongoose_1.Schema.Types.String,
        select: false,
    },
    otp: {
        type: mongoose_1.Schema.Types.String,
        select: false,
        required: false,
    },
    picture: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Attachement',
        index: true,
        required: false,
        trim: true,
    },
    roles: {
        type: [
            {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Role',
            },
        ],
        required: true,
        select: false,
    },
    verified: {
        type: mongoose_1.Schema.Types.Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    },
}, {
    versionKey: false,
});
const DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'users';
exports.UserModel = mongoose_1.model(DOCUMENT_NAME, schema, COLLECTION_NAME);
//# sourceMappingURL=User.js.map