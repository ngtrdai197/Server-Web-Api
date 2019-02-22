const Post = require('../models/Post.model');
const CategoryChild = require('../models/CategoryChild.model');
const File = require('../models/File.model');

exports.create = (req, res) => {
    // const post = new Post(req.body);
    // if(req.files){
    //     console.log('co anh');
    //     return;
    // }else{
    //     console.log('ko co');
    //     return;
    // }
    CategoryChild.findById({ _id: req.body.CategoryChildId }).exec((err, result) => {
        if (err) {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({ message: 'CategoryChildId not found with id:' + req.params.id }); // id cua danh muc con khong ton tai
            }
            return res.status(500).send({ message: err.message });

        } else {
            // danh muc con co ton tai trong db
            post.save().then(_post => {
                if (_post) {
                    result.Posts.push(_post._id);
                    const postList = result.Posts;
                    CategoryChild.findByIdAndUpdate({ _id: req.body.CategoryChildId }, {
                        Posts: postList
                    }).exec().then();
                    return res.status(200).send({ status: true, data: _post });
                }
            }).catch(err => {
                return res.status(500).send({ message: err.message });
            })
        }
    });
};

exports.findImage = (req, res) => {
    File.find({}).exec((err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(data)
    })
};

exports.findAll = (req, res) => {
    Post.find({ _id: req.params.id }).then(posts => {
        return res.status(200).send({ status: true, data: posts });
    }).catch(err => {
        return res.status(500).send({ message: err.message });
    })
};

exports.findOne = (req, res) => {
    Post.findById(req.params._id, '-__v').exec((err, post) => {
        if (err) {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({ message: 'Post not found with id:' + req.params.id });
            }
            return res.status(500).send({ message: err.message });
        }
        return res.status(200).send(post);
    })
};

exports.update = (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec((err, post) => {
        if (err) {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({ message: 'Post not found with id:' + req.params.id });
            }
            return res.status(500).send({ message: err.message });
        }
        return res.status(200).send(post);
    })
};

exports.delete = (req, res) => {
    Post.findByIdAndRemove(req.params.id).exec((err, post) => {
        if (err) {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({ message: 'Post not found with id:' + req.params.id });
            }
            return res.status(500).send({ message: err.message });
        }
        return res.status(200).send({ status: true });
    })
};