"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimesheetModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    datetime: {
        type: Date,
        required: true
    },
    planned: {
        type: mongoose_1.Schema.Types.Array,
        required: true,
        default: []
    },
    status: {
        type: Date,
        required: true,
        default: "ABSENT" /* ABSENT */
    },
    elapsed: {
        type: Number,
        required: false
    }
}, {
    versionKey: false,
});
const DOCUMENT_NAME = 'Timesheet';
const COLLECTION_NAME = 'timesheet';
exports.TimesheetModel = mongoose_1.model(DOCUMENT_NAME, schema, COLLECTION_NAME);
//# sourceMappingURL=Timesheet.js.map