"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOG_DIR = exports.TOKEN_INFO = exports.UPLOAD_SIZE_LIMIT = exports.CORS_URL = exports.db = exports.port = exports.environment = void 0;
// Mapper for environment variables
exports.environment = process.env.NODE_ENV;
exports.port = process.env.PORT;
exports.db = {
    uri: process.env.DB_URI || '',
    name: process.env.DB_NAME || '',
    host: process.env.DB_HOST || '',
    port: process.env.DB_PORT || '',
    user: process.env.DB_USER || '',
    password: process.env.DB_USER_PWD || '',
};
exports.CORS_URL = process.env.CORS_URL;
exports.UPLOAD_SIZE_LIMIT = process.env.UPLOAD_SIZE_LIMIT;
exports.TOKEN_INFO = {
    accessTokenValidityDays: parseInt(process.env.ACCESS_TOKEN_VALIDITY_DAYS || '0'),
    refreshTokenValidityDays: parseInt(process.env.ACCESS_TOKEN_VALIDITY_DAYS || '0'),
    issuer: process.env.TOKEN_ISSUER || '',
    audience: process.env.TOKEN_AUDIENCE || '',
};
exports.LOG_DIR = process.env.LOG_DIR;
//# sourceMappingURL=config.js.map