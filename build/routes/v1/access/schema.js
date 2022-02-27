"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const validator_1 = require("../../../helpers/validator");
exports.default = {
    userCredential: joi_1.default.object().keys({
        //email: Joi.string().required().email(),
        password: joi_1.default.string().required().min(6),
        tel: joi_1.default.string().required().length(10)
    }),
    refreshToken: joi_1.default.object().keys({
        refreshToken: joi_1.default.string().required().min(1),
    }),
    auth: joi_1.default.object()
        .keys({
        authorization: validator_1.JoiAuthBearer().required(),
    })
        .unknown(true),
    signup: joi_1.default.object().keys({
        firstname: joi_1.default.string().required().min(3),
        lastname: joi_1.default.string().required().min(3),
        //email: Joi.string().required().email(),
        password: joi_1.default.string().required().min(6),
        picture: joi_1.default.string().optional().uri(),
        tel: joi_1.default.string().required().length(10).pattern(/^[0-9]+$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` })
    }),
};
//# sourceMappingURL=schema.js.map