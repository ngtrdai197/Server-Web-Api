const Post = require('../models/Post.model');

exports.create = (req, res) => {
    const post = new Post(req.body);
    post.save().then(_post => {
        if (_post) {
            res.status(200).send({ status: true, data: _post });
        }
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
};

exports.findAll = (req, res) => {
    Post.find().then(posts => {
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