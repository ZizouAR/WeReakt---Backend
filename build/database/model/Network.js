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
        enum: [
            "ADVERTISING" /* ADVERTISING */,
            "ENTERTAINEMENT" /* ENTERTAINEMENT */,
            "FOOD" /* FOOD */,
            "HEALTH" /* HEALTH */,
            "MARKETING" /* MARKETING */,
            "PRODUCTION" /* PRODUCTION */,
            "TECHNOLOGY" /* TECHNOLOGY */
        ]
    },
    annual_revenue: {
        type: mongoose_1.Schema.Types.String,
        required: false,
        enum: [
            "$0 - $10K" /* $0_10K */,
            "$10K - $25K" /* $10K_25K */,
            "$25K - $50K" /* $25K_50K */,
            "$50K - $100K" /* $50K_100K */,
            "$+100k" /* $100k_plus */
        ]
    },
    employees_num: {
        type: mongoose_1.Schema.Types.String,
        required: false,
        enum: [
            "0 - 10" /* _0_10 */,
            "10 - 25" /* _10_25 */,
            "25 - 100" /* _25_100 */,
            "100 - 500" /* _100_500 */,
            "+1000" /* _1000_plus */
        ]
    },
}, {
    versionKey: false,
});
const DOCUMENT_NAME = 'Network';
const COLLECTION_NAME = 'networks';
exports.NetworkModel = mongoose_1.model(DOCUMENT_NAME, schema, COLLECTION_NAME);
//# sourceMappingURL=Network.js.map