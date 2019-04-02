const FILE = require("../models/File.model");
const Post = require('../models/Post.model');

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

            for (let index = 0; index < req.files.length; index++) {
                let file = new FILE({
                    FileName: req.files[index].filename,
                    PostId: req.params.id
                });

                file.save().then(_file => {
                    if (_file) {
                        result.FileId.push(_file._id);
                        result.PostUrl.push(`https://node-server-api.azurewebsites.net/images/${_file.FileName}`);
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
            return res.status(200).send({
                status: 200,
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
    FILE.find().then(files => {

    }).catch(err => {
        return res.status(500).send({
            message: err.message
        });
    })
}