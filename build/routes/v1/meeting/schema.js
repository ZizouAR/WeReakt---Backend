"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const Meeting_1 = require("../../../database/model/Meeting");
const validator_1 = require("../../../helpers/validator");
exports.default = {
    insert: joi_1.default.object().keys({
        title: joi_1.default.string().required().min(6).max(100),
        datetime: joi_1.default.date().required(),
        duration: joi_1.default.number().required().min(5).max(480),
        guests: joi_1.default.array().required(),
        status: joi_1.default.string().valid(...Object.values(Meeting_1.MeetingStatus)).optional(),
    }),
    identifier: joi_1.default.object().keys({
        id: validator_1.JoiObjectId().required()
    }),
};
//# sourceMappingURL=schema.js.map