const FILE = require("../models/File.model");
const Post = require('../models/Post.model');
const sharp = require('sharp');

exports.create = (req, res) => {
    // truyền id của post kèm theo url tải ảnh

    Post.findById({
        _id: req.params.id
    }).exec((err, result) => {
        if (err) {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'Post not found with id:' + req.params.id
                }); // id cua danh muc con khong ton tai
            }
            return res.status(500).send({
                message: err.message
            });

        } else {
            // danh muc con co ton tai trong db
            console.log(req.files);
            console.log(req.files.length);

            for (let index = 0; index < req.files.length; index++) {
                sharp(req.files[index].path).resize(300, 300).toFile('public/images/risze_image_300x300-' + req.files[index].filename, (err) => {
                    if (!err) {
                        let file = new FILE({
                            FileName: req.files[index].filename,
                            PostId: req.params.id
                        });
                        file.save().then(_file => {
                            if (_file) {
                                result.FileId.push(_file._id);
                                result.PostUrl.push(`http://192.168.1.138:8088/images/risze_image_300x300-${_file.FileName}`);
                                const postUrlList = result.PostUrl;
                                const fileList = result.FileId;
                                Post.findByIdAndUpdate({
                                    _id: req.params.id
                                }, {
                                        FileId: fileList,
                                        PostUrl: postUrlList
                                    }).exec().then();
                            }
                        }).catch(err => {
                            throw err;
                        })
                    }
                })

            }
            return res.status(200).send({
                status: true,
                message: 'Already upload !!!'
            })
        }
    });
};

exports.findOne = (req, res) => {
    FILE.findById(req.params.id, '-__v').exec((err, file) => {
        if (err) {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'File not found with id:' + req.params.id
                });
            } else {
                return res.status(500).send({
                    message: err.message
                });
            }
        } else {
            if (!file) {
                return res.status(204).send();
            } else {
                return res.status(200).send(file);
            }
        }
    })
};

exports.findAll = (req, res) => {
    FILE.find().then(files => {
        return res.status(200).send({
            status: true,
            data: files
        });
    }).catch(err => {
        return res.status(500).send({
            message: err.message
        });
    })
}

exports.deleteFile_PostUpdate = (req, res) => {
    let _fileName = "";
    FILE.find().then(files => {
        files.map(x => {
            if (req.body.FileName.includes(x.FileName) === true) {
                _fileName = x.FileName;
            }
        });
        if (_fileName !== "") {
            FILE.find({
                FileName: _fileName
            }).remove().exec((err, result) => {
                if (err) {
                    return res.send({
                        message: err.message
                    });
                }
                return res.status(200).send({
                    status: true
                });
            });
        } else {
            return res.status(404).send({
                message: "Not found file with FileName: " + req.body.FileName
            });
        }
    }).catch(err => {
        return res.status(500).send({
            message: err.message
        });
    })
}