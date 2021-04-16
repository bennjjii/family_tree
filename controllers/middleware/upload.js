const util = require("util");
const multer = require("multer");
const maxSize = 2 * 4092 * 4092;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please uplaod only images.", false);
  }
};

const multerMemoryStorage = multer.memoryStorage();

let uploadFile = multer({
  storage: multerMemoryStorage,
  limits: { fileSize: maxSize },
  fileFilter: multerFilter,
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
