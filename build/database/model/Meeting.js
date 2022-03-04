"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetingModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    title: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        maxlength: 300
    },
    datetime: {
        type: Date,
        required: true
    },
    duration: {
        // minutes
        type: mongoose_1.Schema.Types.Number,
        required: true
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    guests: {
        type: [mongoose_1.Schema.Types.ObjectId],
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
    expiresAt: {
        type: Date,
        required: false
    },
    status: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        default: "ON SCHEDULE" /* ON_SCHEDULE */,
        enum: ["CANCELED" /* CANCELED */, "EXPIRED" /* EXPIRED */, "OVERDUE" /* OVERDUE */, "PENDING" /* PENDING */, "ON SCHEDULE" /* ON_SCHEDULE */]
    },
}, {
    versionKey: false,
});
const DOCUMENT_NAME = 'Meeting';
const COLLECTION_NAME = 'meetings';
exports.MeetingModel = mongoose_1.model(DOCUMENT_NAME, schema, COLLECTION_NAME);
//# sourceMappingURL=Meeting.js.map