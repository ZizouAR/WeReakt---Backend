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
const ApiError_1 = require("../../../core/ApiError");
const validator_1 = __importStar(require("../../../helpers/validator"));
const schema_1 = __importDefault(require("./schema"));
const asyncHandler_1 = __importDefault(require("../../../helpers/asyncHandler"));
const authentication_1 = __importDefault(require("../../../auth/authentication"));
const MessageRepo_1 = __importDefault(require("../../../database/repository/MessageRepo"));
const GroupRepo_1 = __importDefault(require("../../../database/repository/GroupRepo"));
const uploadHandler_1 = __importDefault(require("../../../helpers/uploadHandler"));
const AttachementRepo_1 = __importDefault(require("../../../database/repository/AttachementRepo"));
const router = express_1.default.Router();
/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for writer's role
router.use('/', authentication_1.default);
/*-------------------------------------------------------------------------*/
router.post('/send', uploadHandler_1.default.single('attachement'), validator_1.default(schema_1.default.insert), asyncHandler_1.default(async (req, res) => {
    // set user and attachement
    req.body.sender = req.user;
    let attachement = req.file;
    // upload 
    if (attachement) {
        req.body.hasAttachement = true;
        attachement.user = req.user;
        attachement.as = "MESSAGE" /* MESSAGE */;
        req.body.attachement = await AttachementRepo_1.default.upload(attachement);
    }
    // create message
    req.body;
    if (!req.body.hasAttachement && req.body.message.trim().length < 1)
        throw new ApiError_1.BadRequestError();
    // is a group chat / is a member
    req.body.isGroupChat = await GroupRepo_1.default.isGroupChat(req.body.receiver);
    if (req.body.isGroupChat && !(GroupRepo_1.default.isMember(req.body.isGroupChat, req.body.sender)))
        throw new ApiError_1.ForbiddenError();
    // return res
    const msg = await MessageRepo_1.default.create(req.body);
    new ApiResponse_1.SuccessResponse('sent', msg).send(res);
}));
router.post('/read', validator_1.default(schema_1.default.insert), asyncHandler_1.default(async (req, res) => {
    const messages = await MessageRepo_1.default.read(req.user, req.body.user);
    new ApiResponse_1.SuccessResponse('retreived', messages).send(res);
}));
router.delete('/id/:id', validator_1.default(schema_1.default.delete, validator_1.ValidationSource.PARAM), asyncHandler_1.default(async (req, res) => {
    //....
}));
exports.default = router;
//# sourceMappingURL=index.js.map