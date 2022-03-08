"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const validator_1 = require("../../../helpers/validator");
exports.default = {
    insert: joi_1.default.object().keys({
        title: joi_1.default.string().required().min(6).max(100),
        description: joi_1.default.string().required().min(6).max(100),
        doer: validator_1.JoiObjectId().required()
    }),
    update: joi_1.default.object().keys({
        status: joi_1.default.string().required()
    }),
    delete: joi_1.default.object().keys({
        id: validator_1.JoiObjectId().required()
    }),
};
//# sourceMappingURL=schema.js.map