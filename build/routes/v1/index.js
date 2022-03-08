"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apikey_1 = __importDefault(require("../../auth/apikey"));
const signup_1 = __importDefault(require("./access/signup"));
const login_1 = __importDefault(require("./access/login"));
const logout_1 = __importDefault(require("./access/logout"));
const token_1 = __importDefault(require("./access/token"));
const blogList_1 = __importDefault(require("./blog/blogList"));
const blogDetail_1 = __importDefault(require("./blog/blogDetail"));
const writer_1 = __importDefault(require("./blog/writer"));
const editor_1 = __importDefault(require("./blog/editor"));
const message_1 = __importDefault(require("./message"));
const note_1 = __importDefault(require("./note"));
const job_1 = __importDefault(require("./job"));
const departement_1 = __importDefault(require("./departement"));
const network_1 = __importDefault(require("./network"));
const group_1 = __importDefault(require("./group"));
const meeting_1 = __importDefault(require("./meeting"));
const hierarchy_1 = __importDefault(require("./hierarchy"));
const router = express_1.default.Router();
/*-------------------------------------------------------------------------*/
// Below all APIs are public APIs protected by api-key
router.use('/', apikey_1.default);
/*-------------------------------------------------------------------------*/
router.use('/signup', signup_1.default);
router.use('/login', login_1.default);
router.use('/logout', logout_1.default);
router.use('/token', token_1.default);
router.use('/blogs', blogList_1.default);
router.use('/blog', blogDetail_1.default);
router.use('/writer/blog', writer_1.default);
router.use('/editor/blog', editor_1.default);
router.use('/note', note_1.default);
router.use('/departement', departement_1.default);
router.use('/message', message_1.default);
router.use('/job', job_1.default);
router.use('/network', network_1.default);
router.use('/group', group_1.default);
router.use('/hierarchy', hierarchy_1.default);
router.use('/meeting', meeting_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map