const router = require('express').Router();
const user = require('../controllers/user.controller');
const auth = require('../controllers/auth/login.controller');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/users');
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
        fileSize: 5120 * 2048
    }
});

router.post('/api/auth/login', auth.login);

router.get('/api', user.findAll);
router.get('/api/:id', user.findOne);
router.put('/api/update/:id', user.update);
router.post('/api/create', user.create);
router.delete('/api/delete/:id', user.delete);

router.post("/upload/:id", upload.any(), user.upload_image);


module.exports = router;