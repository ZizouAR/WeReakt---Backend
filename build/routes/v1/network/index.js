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
const NetworkRepo_1 = __importDefault(require("../../../database/repository/NetworkRepo"));
const mongoose_1 = require("mongoose");
const role_1 = __importDefault(require("../../../helpers/role"));
const router = express_1.default.Router();
/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for writer's role
router.use('/', authentication_1.default, role_1.default("OWNER" /* OWNER */), authorization_1.default);
/*-------------------------------------------------------------------------*/
router.post('/create', validator_1.default(schema_1.default.insert), asyncHandler_1.default(async (req, res) => {
    // initialize request
    req.body.createdBy = req.user;
    const network = await NetworkRepo_1.default.create(req.body);
    new ApiResponse_1.SuccessResponse('created', network).send(res);
}));
router.get('/:id', validator_1.default(schema_1.default.identifier, validator_1.ValidationSource.PARAM), asyncHandler_1.default(async (req, res) => {
    const network = await NetworkRepo_1.default.find(new mongoose_1.Types.ObjectId(req.params.id));
    new ApiResponse_1.SuccessResponse('retreived', network).send(res);
}));
exports.default = router;
//# sourceMappingURL=index.js.map