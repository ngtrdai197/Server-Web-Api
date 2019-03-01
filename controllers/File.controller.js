const FILE = require("../models/File.model");
const Post = require('../models/Post.model');

module.exports = {
    create: function (req, res) {
        // truyền id của post kèm theo url tải ảnh
        
        Post.findById({ _id: req.params.id }).exec((err, result) => {
            if (err) {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({ message: 'Post not found with id:' + req.params.id }); // id cua danh muc con khong ton tai
                }
                return res.status(500).send({ message: err.message });

            } else {
                // danh muc con co ton tai trong db
                for (let index = 0; index < req.files.length; index++) {
                    let file = new FILE({
                        FileName: req.files[index].filename,
                        PostId: req.params.id
                    });
                    file.save().then(_file => {
                        if (_file) {
                            result.FileId.push(_file._id);
                            result.PostUrl.push(`https://server-web-api.herokuapp.com/images/${_file.FileName}`);
                            const postUrlList = result.PostUrl;
                            const fileList = result.FileId;
                            Post.findByIdAndUpdate({ _id: req.params.id }, {
                                FileId: fileList,
                                PostUrl:postUrlList
                            }).exec().then();
                        }
                    }).catch(err => {
                        throw err;
                    })
                }
                return res.status(200).send({ message: 'Already upload !!!' })
            }
        });
    }
}