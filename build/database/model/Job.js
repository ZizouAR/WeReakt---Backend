"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    title: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        maxlength: 200
    },
    description: {
        type: Date,
        required: false,
        maxlength: 500
    },
    departement: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Departement',
        required: true,
        index: true,
    },
    roles: {
        type: [
            {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Role',
            },
        ],
        required: true,
        select: false,
    },
}, {
    versionKey: false,
});
const DOCUMENT_NAME = 'Job';
const COLLECTION_NAME = 'jobs';
exports.JobModel = mongoose_1.model(DOCUMENT_NAME, schema, COLLECTION_NAME);
//# sourceMappingURL=Job.js.map