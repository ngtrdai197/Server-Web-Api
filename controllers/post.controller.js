const Post = require('../models/Post.model');
const CategoryChild = require('../models/CategoryChild.model');
const Files = require('../models/File.model');

exports.create = (req, res) => {
    // console.log(req.body);
    CategoryChild.findById({ _id: req.body.CategoryChildId }).exec((err, result) => {
        console.log(req.body);
        
        if (err) {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({ message: 'CategoryChildId not found with id:' + req.params.id }); // id cua danh muc con khong ton tai
            }
            return res.status(500).send({ message: err.message });

        } else {
            // danh muc con co ton tai trong db
            const post = new Post(req.body);
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

// lấy tất cả các bài đăng trong db
exports.findAll = (req, res) => {
    Post.find().sort('-PostDate').then(posts => {
        return res.status(200).send({ status: true, data: posts });
    }).catch(err => {
        return res.status(500).send({ message: err.message });
    })
};

exports.findOne = (req, res) => {
    Post.findById(req.params.id, '-__v').exec((err, post) => {
        if (err) {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({ message: 'Post not found with id:' + req.params.id });
            }
            return res.status(500).send({ message: err.message });
        }
        return res.status(200).send(post);
    })
};

exports.findPostByUserId = (req, res) => {
    Post.find({ UserId: req.params.id }, '-__v').sort('-PostDate').exec((err, posts) => {
        if (err) {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({ message: 'Post not found with User id:' + req.params.id });
            }
            return res.status(500).send({ message: err.message });
        }
        return res.status(200).send(posts);
    })
}

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
    // Post.findByIdAndRemove(req.params.id).exec((err, post) => {

    Post.findByIdAndRemove(req.params.id).exec((err, post) => {
        if (err) {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({ message: 'Post not found with id:' + req.params.id });
            }
            return res.status(500).send({ message: err.message });
        } else {
            CategoryChild.find({ _id: post.CategoryChildId }).exec((err, cate_child) => {
                if (err) {
                    if (err.kind === 'ObjectId') {
                        return res.status(404).send({ message: 'CategoryChild not found with id:' + post.CategoryChildId });
                    }
                }
                else {
                    const index = cate_child[0].Posts.indexOf(req.params.id);
                    cate_child[0].Posts.splice(index, 1);
                    CategoryChild.findByIdAndUpdate({ _id: post.CategoryChildId }, {
                        Posts: cate_child[0].Posts
                    }).exec().then();
                    return res.status(200).send({ status: true });

                }
            })
        }
    })
};