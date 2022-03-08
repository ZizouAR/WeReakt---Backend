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
const GroupRepo_1 = __importDefault(require("../../../database/repository/GroupRepo"));
const router = express_1.default.Router();
/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for writer's role
router.use('/', authentication_1.default);
/*-------------------------------------------------------------------------*/
router.post('/create', validator_1.default(schema_1.default.insert), asyncHandler_1.default(async (req, res) => {
    // initialize request
    req.body.createdBy = req.user;
    req.body.members = [];
    const grp = await GroupRepo_1.default.create(req.body);
    new ApiResponse_1.SuccessResponse('created', grp).send(res);
}));
router.post('/accept', validator_1.default(schema_1.default.identifier), asyncHandler_1.default(async (req, res) => {
    // do exist
    const group = await GroupRepo_1.default.isGroupChat(req.body.id);
    if (!group)
        throw new ApiError_1.NotFoundError();
    // accept invite
    group.members.push(req.user);
    const grp = GroupRepo_1.default.update(req.body);
    new ApiResponse_1.SuccessResponse('accepted', grp).send(res);
}));
router.get('/', asyncHandler_1.default(async (req, res) => {
    const groups = await GroupRepo_1.default.find(req.user);
    new ApiResponse_1.SuccessResponse('retreived', groups).send(res);
}));
router.delete('/id/:id', validator_1.default(schema_1.default.identifier, validator_1.ValidationSource.PARAM), asyncHandler_1.default(async (req, res) => {
    //....
}));
exports.default = router;
//# sourceMappingURL=index.js.map