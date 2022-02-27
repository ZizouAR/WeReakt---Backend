"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupsModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        maxlength: 300
    },
    users: {
        type: mongoose_1.Schema.Types.Array,
        required: true
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
const DOCUMENT_NAME = 'Request';
const COLLECTION_NAME = 'requests';
exports.GroupsModel = mongoose_1.model(DOCUMENT_NAME, schema, COLLECTION_NAME);
//# sourceMappingURL=Groups.js.map