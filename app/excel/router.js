import express from "express";
import multer from "multer";
import path from "path";

var storage = multer.memoryStorage()
var upload = multer({storage: storage,
    fileFilter: function (req, file, callback) {
        let permittedExtensions = ['.csv'];
        let ext = path.extname(file.originalname);
        if(!permittedExtensions.includes(ext)) {
            return callback(new Error('Invalid format of file is uploaded'))
        }
        callback(null, true)
    }
}); 

import {csvupload} from "./controller.js";

const excelRouter = express.Router();

excelRouter.post("/csvupload", upload.single("file"), csvupload);

export {excelRouter}