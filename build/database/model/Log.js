"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    action: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    ipAddress: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    macAddress: {
        type: mongoose_1.Schema.Types.String,
        required: false
    },
    device: {
        type: mongoose_1.Schema.Types.String,
        required: false
    },
    device_id: {
        type: mongoose_1.Schema.Types.String,
        required: false
    },
    browser: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    system: {
        type: mongoose_1.Schema.Types.String,
        required: false
    },
    system_v: {
        type: mongoose_1.Schema.Types.String,
        required: false
    },
    carrier: {
        type: mongoose_1.Schema.Types.String,
        required: false
    },
    brand: {
        type: mongoose_1.Schema.Types.String,
        required: false
    },
    user_agent: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    isEmulator: {
        type: mongoose_1.Schema.Types.Boolean,
        required: false
    },
    isLocationEnabled: {
        type: mongoose_1.Schema.Types.Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
}, {
    versionKey: false,
});
const DOCUMENT_NAME = 'Log';
const COLLECTION_NAME = 'logs';
exports.LogModel = mongoose_1.model(DOCUMENT_NAME, schema, COLLECTION_NAME);
//# sourceMappingURL=Log.js.map