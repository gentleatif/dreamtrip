const multer = require("multer");

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: function (req, file, cb) {
    if (!file.mimetype.match(/jpe|jpeg|png|gig$i/)) {
      cb(new Error("file is not supported"), false);
    }
    cb(null, true);
  },
});
