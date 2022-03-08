"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        maxlength: 300
    },
    members: {
        type: [
            {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        required: true,
        default: []
    },
    invited: {
        type: [
            {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: false
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    updatedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
        index: true
    }
}, {
    versionKey: false,
});
const DOCUMENT_NAME = 'Group';
const COLLECTION_NAME = 'groups';
exports.GroupModel = mongoose_1.model(DOCUMENT_NAME, schema, COLLECTION_NAME);
//# sourceMappingURL=Group.js.map