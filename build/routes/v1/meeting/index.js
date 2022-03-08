"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ApiResponse_1 = require("../../../core/ApiResponse");
const validator_1 = __importStar(require("../../../helpers/validator"));
const schema_1 = __importDefault(require("./schema"));
const role_1 = __importDefault(require("../../../helpers/role"));
const authorization_1 = __importDefault(require("../../../auth/authorization"));
const asyncHandler_1 = __importDefault(require("../../../helpers/asyncHandler"));
const authentication_1 = __importDefault(require("../../../auth/authentication"));
const MeetingRepo_1 = __importDefault(require("../../../database/repository/MeetingRepo"));
const mongoose_1 = require("mongoose");
const ApiError_1 = require("../../../core/ApiError");
const router = express_1.default.Router();
/*-------------------------------------------------------------------------*/
// private APIs protected for Admin role
router.use('/r', authentication_1.default, role_1.default("ADMIN" /* ADMIN */), authorization_1.default);
// protected APIs
router.use('/', authentication_1.default);
/*-------------------------------------------------------------------------*/
router.post('/r/create', validator_1.default(schema_1.default.insert), asyncHandler_1.default(async (req, res) => {
    req.body.createdBy = req.user;
    const meeting = await MeetingRepo_1.default.create(req.body);
    new ApiResponse_1.SuccessResponse('created', meeting).send(res);
}));
router.put('/r/update', validator_1.default(schema_1.default.insert), validator_1.default(schema_1.default.identifier), asyncHandler_1.default(async (req, res) => {
    // only creator has permission to update
    if (!(await MeetingRepo_1.default.isCreator(req.user, req.body.id)))
        throw new ApiError_1.ForbiddenError();
    const meetings = await MeetingRepo_1.default.update(req.body);
    new ApiResponse_1.SuccessResponse('updated', meetings).send(res);
}));
router.get('/', asyncHandler_1.default(async (req, res) => {
    const meetings = await MeetingRepo_1.default.findRecent(req.user);
    new ApiResponse_1.SuccessResponse('retreived', meetings).send(res);
}));
router.delete('/r/remove/:id', validator_1.default(schema_1.default.identifier, validator_1.ValidationSource.PARAM), asyncHandler_1.default(async (req, res) => {
    const meeting = await MeetingRepo_1.default.remove(new mongoose_1.Types.ObjectId(req.params.id));
    new ApiResponse_1.SuccessResponse('removed', meeting).send(res);
}));
exports.default = router;
//# sourceMappingURL=index.js.map