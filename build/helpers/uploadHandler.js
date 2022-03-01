"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require("multer");
const ApiError_1 = require("../core/ApiError");
const config_1 = require("../config");
exports.default = multer({
    limits: {
        fileSize: config_1.UPLOAD_SIZE_LIMIT,
    },
    // checks if the image is of suitable type
    fileFilter(req, file, err) {
        // cb is callback function
        if (!file.originalname.match(/\.(jpg|jpeg|png|ico|gif|heic|mpeg|doc|pdf|xls|xlsx|csv|ppt|pptx|docx|odt|txt|m4a|flac|mp3|mp4|wav|wma|aac)$/)) {
            return err(new ApiError_1.BadRequestError("Please upload a suitable file"));
        }
        // this code accepts the uploaded file
        err(undefined, true);
    },
});
//# sourceMappingURL=uploadHandler.js.map