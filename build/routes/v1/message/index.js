"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ApiResponse_1 = require("../../../core/ApiResponse");
const ApiError_1 = require("../../../core/ApiError");
const validator_1 = __importDefault(require("../../../helpers/validator"));
const schema_1 = __importDefault(require("./schema"));
const asyncHandler_1 = __importDefault(require("../../../helpers/asyncHandler"));
const authentication_1 = __importDefault(require("../../../auth/authentication"));
const MessageRepo_1 = __importDefault(require("../../../database/repository/MessageRepo"));
const GroupsRepo_1 = __importDefault(require("../../../database/repository/GroupsRepo"));
const uploadHandler_1 = __importDefault(require("../../../helpers/uploadHandler"));
const AttachementRepo_1 = __importDefault(require("../../../database/repository/AttachementRepo"));
const Logger_1 = __importDefault(require("../../../core/Logger"));
const router = express_1.default.Router();
/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for writer's role
router.use('/', authentication_1.default);
/*-------------------------------------------------------------------------*/
router.post('/send', uploadHandler_1.default.single('attachement'), validator_1.default(schema_1.default.message), asyncHandler_1.default(async (req, res) => {
    Logger_1.default.info("sending...");
    // set user and attachement
    req.body.createdAt = new Date();
    req.body.sender = req.user;
    let attachement = req.file;
    // upload 
    if (attachement) {
        Logger_1.default.info("is Attachement ...");
        req.body.hasAttachement = true;
        attachement.user = req.user;
        attachement.as = "MESSAGE" /* MESSAGE */;
        attachement = await AttachementRepo_1.default.upload(attachement);
    }
    // create message
    req.body;
    Logger_1.default.info("is group CHAT ??? ...");
    req.body.isGroupChat = await GroupsRepo_1.default.isGroupChat(req.body.receiver);
    Logger_1.default.info("is group MEMBER ??? ...");
    if (req.body.isGroupChat && !(GroupsRepo_1.default.isMember(req.body.isGroupChat, req.body.sender)))
        throw new ApiError_1.ForbiddenError("You're not a member.");
    Logger_1.default.info("creating ....");
    const msg = await MessageRepo_1.default.create(req.body);
    Logger_1.default.info("done :D");
    new ApiResponse_1.SuccessResponse('sent', msg).send(res);
}));
exports.default = router;
//# sourceMappingURL=index.js.map