const express = require('express');
const multer = require('multer');
const router = express.Router();
const file = require("../controllers/File.controller");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

router.post("/upload", upload.any(), file.create);

module.exports = router;