"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const validator_1 = require("../../../helpers/validator");
exports.default = {
    message: joi_1.default.object().keys({
        message: joi_1.default.string().required().min(1).max(1000),
        receiver: validator_1.JoiObjectId().required(),
    })
};
//# sourceMappingURL=schema.js.map