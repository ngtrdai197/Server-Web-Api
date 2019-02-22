const FILE = require("../models/File.model");

module.exports = {
    create: function (req, res) {
        const file = FILE({
            FileName: req.files[0].filename,
            FileOriginal: req.files[0].originalname,
            UploadDate: new Date().toString()
        });

        // req.files.map(x => console.log(x));
        
        file.save().then(() => {
            res.status(200).json({ status: file.FileName});
        }).catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
    }

}