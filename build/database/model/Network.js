"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkModel = exports.EMPLOYEES_NUM = exports.ANNUEL_REVENUE = exports.INDUSTRIES = void 0;
const mongoose_1 = require("mongoose");
var INDUSTRIES;
(function (INDUSTRIES) {
    INDUSTRIES["ADVERTISING"] = "ADVERTISING";
    INDUSTRIES["MARKETING"] = "MARKETING";
    INDUSTRIES["TECHNOLOGY"] = "TECHNOLOGY";
    INDUSTRIES["HEALTH"] = "HEALTH";
    INDUSTRIES["FOOD"] = "FOOD";
    INDUSTRIES["ENTERTAINEMENT"] = "ENTERTAINEMENT";
    INDUSTRIES["PRODUCTION"] = "PRODUCTION";
})(INDUSTRIES = exports.INDUSTRIES || (exports.INDUSTRIES = {}));
var ANNUEL_REVENUE;
(function (ANNUEL_REVENUE) {
    ANNUEL_REVENUE["$0_10K"] = "$0 - $10K";
    ANNUEL_REVENUE["$10K_25K"] = "$10K - $25K";
    ANNUEL_REVENUE["$25K_50K"] = "$25K - $50K";
    ANNUEL_REVENUE["$50K_100K"] = "$50K - $100K";
    ANNUEL_REVENUE["$100k_plus"] = "$+100k";
})(ANNUEL_REVENUE = exports.ANNUEL_REVENUE || (exports.ANNUEL_REVENUE = {}));
var EMPLOYEES_NUM;
(function (EMPLOYEES_NUM) {
    EMPLOYEES_NUM["_0_10"] = "0 - 10";
    EMPLOYEES_NUM["_10_25"] = "10 - 25";
    EMPLOYEES_NUM["_25_100"] = "25 - 100";
    EMPLOYEES_NUM["_100_500"] = "100 - 500";
    EMPLOYEES_NUM["_1000_plus"] = "+1000";
})(EMPLOYEES_NUM = exports.EMPLOYEES_NUM || (exports.EMPLOYEES_NUM = {}));
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
            INDUSTRIES.ADVERTISING,
            INDUSTRIES.ENTERTAINEMENT,
            INDUSTRIES.FOOD,
            INDUSTRIES.HEALTH,
            INDUSTRIES.MARKETING,
            INDUSTRIES.PRODUCTION,
            INDUSTRIES.TECHNOLOGY
        ]
    },
    annual_revenue: {
        type: mongoose_1.Schema.Types.String,
        required: false,
        enum: [
            ANNUEL_REVENUE.$0_10K,
            ANNUEL_REVENUE.$10K_25K,
            ANNUEL_REVENUE.$25K_50K,
            ANNUEL_REVENUE.$50K_100K,
            ANNUEL_REVENUE.$100k_plus
        ]
    },
    employees_num: {
        type: mongoose_1.Schema.Types.String,
        required: false,
        enum: [
            EMPLOYEES_NUM._0_10,
            EMPLOYEES_NUM._10_25,
            EMPLOYEES_NUM._25_100,
            EMPLOYEES_NUM._100_500,
            EMPLOYEES_NUM._1000_plus
        ]
    },
}, {
    versionKey: false,
});
const DOCUMENT_NAME = 'Network';
const COLLECTION_NAME = 'networks';
exports.NetworkModel = mongoose_1.model(DOCUMENT_NAME, schema, COLLECTION_NAME);
//# sourceMappingURL=Network.js.map