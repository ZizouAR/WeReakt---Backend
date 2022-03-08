"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ApiResponse_1 = require("../../../core/ApiResponse");
const crypto_1 = __importDefault(require("crypto"));
const UserRepo_1 = __importDefault(require("../../../database/repository/UserRepo"));
const AttachementRepo_1 = __importDefault(require("../../../database/repository/AttachementRepo"));
const ApiError_1 = require("../../../core/ApiError");
const authUtils_1 = require("../../../auth/authUtils");
const validator_1 = __importDefault(require("../../../helpers/validator"));
const schema_1 = __importDefault(require("./schema"));
const asyncHandler_1 = __importDefault(require("../../../helpers/asyncHandler"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const lodash_1 = __importDefault(require("lodash"));
const uploadHandler_1 = __importDefault(require("../../../helpers/uploadHandler"));
const JobRepo_1 = __importDefault(require("../../../database/repository/JobRepo"));
const router = express_1.default.Router();
router.post('/basic', uploadHandler_1.default.single('avatar'), validator_1.default(schema_1.default.signup), asyncHandler_1.default(async (req, res) => {
    // @CAST USER
    const USER = req.body;
    const attachement = req.file;
    const user = await UserRepo_1.default.findByPhone(USER.tel);
    if (user)
        throw new ApiError_1.BadRequestError('User already registered');
    if (!(await JobRepo_1.default.findById(req.body.job)))
        throw new ApiError_1.NotFoundError("Job not found");
    const accessTokenKey = crypto_1.default.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto_1.default.randomBytes(64).toString('hex');
    USER.password = await bcrypt_1.default.hash(USER.password, 10);
    const { user: createdUser, keystore } = await UserRepo_1.default.create(USER, accessTokenKey, refreshTokenKey, "ADMIN" /* ADMIN */);
    // @ATTACHEMENT
    if (attachement) {
        attachement.user = createdUser._id;
        attachement.as = "PROFILE" /* PROFILE */;
        // @SET PROFILE_PIC
        createdUser.picture = await AttachementRepo_1.default.upload(attachement);
        await UserRepo_1.default.updateInfo(createdUser);
    }
    const tokens = await authUtils_1.createTokens(createdUser, keystore.primaryKey, keystore.secondaryKey);
    new ApiResponse_1.SuccessResponse('Signup Successful', {
        user: lodash_1.default.pick(createdUser, ['_id', 'name', 'tel', 'roles', 'picture']),
        tokens: tokens,
    }).send(res);
}));
exports.default = router;
//# sourceMappingURL=signup.js.map