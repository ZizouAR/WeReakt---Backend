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
const HierarchyRepo_1 = __importDefault(require("../../../database/repository/HierarchyRepo"));
const mongoose_1 = require("mongoose");
const ApiError_1 = require("../../../core/ApiError");
const router = express_1.default.Router();
/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for Admin role
router.use('/', authentication_1.default, role_1.default("ADMIN" /* ADMIN */), authorization_1.default);
/*-------------------------------------------------------------------------*/
router.post('/update', validator_1.default(schema_1.default.update, validator_1.ValidationSource.PARAM), asyncHandler_1.default(async (req, res) => {
    req.body.updatedBy = req.user;
    const hierarchy = await HierarchyRepo_1.default.update(req.body);
    new ApiResponse_1.SuccessResponse('retreived', hierarchy).send(res);
}));
router.get('/network/:id', validator_1.default(schema_1.default.identifier, validator_1.ValidationSource.PARAM), asyncHandler_1.default(async (req, res) => {
    const hierarchy = await HierarchyRepo_1.default.findByNetwork(new mongoose_1.Types.ObjectId(req.params.id));
    if (!hierarchy)
        throw new ApiError_1.NotFoundError();
    new ApiResponse_1.SuccessResponse('retreived', hierarchy).send(res);
}));
exports.default = router;
//# sourceMappingURL=index.js.map