"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartementModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        maxlength: 300
    },
    network: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Network',
        required: true,
        index: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: false
    }
}, {
    versionKey: false,
});
const DOCUMENT_NAME = 'Departement';
const COLLECTION_NAME = 'departements';
exports.DepartementModel = mongoose_1.model(DOCUMENT_NAME, schema, COLLECTION_NAME);
//# sourceMappingURL=Department.js.map