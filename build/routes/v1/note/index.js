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
const authorization_1 = __importDefault(require("../../../auth/authorization"));
const asyncHandler_1 = __importDefault(require("../../../helpers/asyncHandler"));
const authentication_1 = __importDefault(require("../../../auth/authentication"));
const NoteRepo_1 = __importDefault(require("../../../database/repository/NoteRepo"));
const mongoose_1 = require("mongoose");
const role_1 = __importDefault(require("../../../helpers/role"));
const JobRepo_1 = __importDefault(require("../../../database/repository/JobRepo"));
const uploadHandler_1 = __importDefault(require("../../../helpers/uploadHandler"));
const AttachementRepo_1 = __importDefault(require("../../../database/repository/AttachementRepo"));
const Logger_1 = __importDefault(require("../../../core/Logger"));
const router = express_1.default.Router();
/*-------------------------------------------------------------------------*/
// private APIs protected for Admin role
// protected APIs
router.use('/', authentication_1.default);
router.use('/r', role_1.default("ADMIN" /* ADMIN */), authorization_1.default);
/*-------------------------------------------------------------------------*/
router.post('/r/create', uploadHandler_1.default.single('attachement'), validator_1.default(schema_1.default.insert), asyncHandler_1.default(async (req, res) => {
    // initialize request
    req.body.createdBy = req.user;
    Logger_1.default.info(req.user);
    req.body.network = req.user.network;
    let attachement = req.file;
    if (req.body.departement)
        req.body.private = true;
    // upload
    if (attachement) {
        attachement.user = req.user;
        attachement.as = "NOTE" /* NOTE */;
        req.body.attachement = await AttachementRepo_1.default.upload(attachement);
    }
    const note = await NoteRepo_1.default.create(req.body);
    new ApiResponse_1.SuccessResponse('created', note).send(res);
}));
router.get('/', asyncHandler_1.default(async (req, res) => {
    // get job information
    const job = await JobRepo_1.default.findById(req.user.job);
    // get recent public and private notes
    const open = await NoteRepo_1.default.findRecentByNetwork(req.user.network); // public
    const closed = await NoteRepo_1.default.findRecentByDepartement(job === null || job === void 0 ? void 0 : job.departement); // private
    // concat arrays
    open.push(...closed);
    new ApiResponse_1.SuccessResponse('retreived', open).send(res);
}));
router.delete('/delete/:id', validator_1.default(schema_1.default.identifier, validator_1.ValidationSource.PARAM), asyncHandler_1.default(async (req, res) => {
    const note = await NoteRepo_1.default.remove(new mongoose_1.Types.ObjectId(req.params.id));
    new ApiResponse_1.SuccessResponse('deleted', note).send(res);
}));
exports.default = router;
//# sourceMappingURL=index.js.map