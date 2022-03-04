"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HierarchyModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    network: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Network',
        required: true,
        index: true
    },
    updatedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    updatedAt: {
        type: Date,
        required: false
    },
    hierarchy: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    }
}, {
    versionKey: false,
});
const DOCUMENT_NAME = 'Hierarchy';
const COLLECTION_NAME = 'hierarchies';
exports.HierarchyModel = mongoose_1.model(DOCUMENT_NAME, schema, COLLECTION_NAME);
//# sourceMappingURL=Hierarchy.js.map