"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        maxlength: 200
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
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: false
    },
    industry: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    annual_revenue: {
        type: mongoose_1.Schema.Types.String,
        required: false,
    },
    employees_num: {
        type: mongoose_1.Schema.Types.String,
        required: false,
    },
}, {
    versionKey: false,
});
const DOCUMENT_NAME = 'Network';
const COLLECTION_NAME = 'networks';
exports.NetworkModel = mongoose_1.model(DOCUMENT_NAME, schema, COLLECTION_NAME);
//# sourceMappingURL=Network.js.map