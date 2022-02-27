"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Logger_1 = __importDefault(require("../core/Logger"));
const config_1 = require("../config");
//import ApiKeyRepo from './repository/ApiKeyRepo';
//import RoleRepo from './repository/RoleRepo';
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    autoIndex: true,
    poolSize: 10,
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
};
Logger_1.default.debug(config_1.db.uri);
// Create the database connection
mongoose_1.default
    .connect(config_1.db.uri, options)
    .then(() => {
    Logger_1.default.info('Mongoose connection done');
})
    .catch((e) => {
    Logger_1.default.info('Mongoose connection error');
    Logger_1.default.error(e);
});
// CONNECTION EVENTS
// When successfully connected
mongoose_1.default.connection.on('connected', () => {
    Logger_1.default.info('Mongoose default connection open to ' + config_1.db.uri);
});
// If the connection throws an error
mongoose_1.default.connection.on('error', (err) => {
    Logger_1.default.error('Mongoose default connection error: ' + err);
});
// When the connection is disconnected
mongoose_1.default.connection.on('disconnected', () => {
    Logger_1.default.info('Mongoose default connection disconnected');
});
// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
    mongoose_1.default.connection.close(() => {
        Logger_1.default.info('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});
//ApiKeyRepo.seed();
//RoleRepo.seed();
//# sourceMappingURL=index.js.map