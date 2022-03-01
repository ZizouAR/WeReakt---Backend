const multer = require("multer");
import { BadRequestError } from '../core/ApiError';
import { UPLOAD_SIZE_LIMIT } from '../config';



export default multer({
  limits: {
    fileSize: UPLOAD_SIZE_LIMIT, // 10mb
  },

  // checks if the image is of suitable type
  fileFilter(req: Request, file: any, err: Function) {

    // cb is callback function
    if (!file.originalname.match(/\.(jpg|jpeg|png|ico|gif|heic|mpeg|doc|pdf|xls|xlsx|csv|ppt|pptx|docx|odt|txt|m4a|flac|mp3|mp4|wav|wma|aac)$/)) {
      return err(
        new BadRequestError("Please upload a suitable file")
      );
    }
    
    // this code accepts the uploaded file
    err(undefined, true);
  },
});
