"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    code: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        enum: ["OWNER" /* OWNER */, "ADMIN" /* ADMIN */, "MODERATOR" /* MODERATOR */],
    },
    status: {
        type: mongoose_1.Schema.Types.Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        required: true,
        select: false,
    },
    updatedAt: {
        type: Date,
        required: true,
        select: false,
    },
}, {
    versionKey: false,
});
const DOCUMENT_NAME = 'Role';
const COLLECTION_NAME = 'roles';
exports.RoleModel = mongoose_1.model(DOCUMENT_NAME, schema, COLLECTION_NAME);
//# sourceMappingURL=Role.js.map