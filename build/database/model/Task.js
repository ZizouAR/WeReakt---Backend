"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModel = void 0;
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
    doer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    status: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        default: "PENDING" /* PENDING */,
        enum: ["CANCELED" /* CANCELED */, "DONE" /* DONE */, "OVERDUE" /* OVERDUE */, "PENDING" /* PENDING */]
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
const DOCUMENT_NAME = 'Task';
const COLLECTION_NAME = 'tasks';
exports.TaskModel = mongoose_1.model(DOCUMENT_NAME, schema, COLLECTION_NAME);
//# sourceMappingURL=Task.js.map