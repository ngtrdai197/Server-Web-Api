const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();
const file = require("../controllers/File.controller");
const user = require("../controllers/user.controller");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },
    limits: {
        fileSize: 1024 * 1024
    }
});

router.post("/upload/:id", upload.any(), file.create);
router.get("/file/api/:id", file.findOne);
router.get("/files/api", file.findAll);

module.exports = router;