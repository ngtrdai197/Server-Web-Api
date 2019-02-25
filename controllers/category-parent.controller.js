const CategoryParent = require('../models/CategoryParent.model');

exports.create = (req, res) => {
    const categoryParent = new CategoryParent(req.body);
    categoryParent.save().then(_categoryParent => {
        if (_categoryParent) {
            res.status(200).send({ status: true, data: _categoryParent });
        }
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
};

exports.findAll = (req, res) => {
    CategoryParent.find().then(categoryParents => {
        return res.status(200).send({ status: true, data: categoryParents });
    }).catch(err => {
        return res.status(500).send({ message: err.message });
    })
};

exports.findOne = (req, res) => {
    CategoryParent.findById(req.params.id, '-__v').exec((err, categoryParent) => {
        if (err) {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({ message: 'CategoryParent not found with id:' + req.params.id });
            }
            return res.status(500).send({ message: err.message });
        }
        return res.status(200).send(categoryParent);
    })
};

exports.findChildByParentId = (req, res) => {
    CategoryParent.findById({ _id: req.params.id }).select()
        .populate({ path: 'CategoryChilds', populate: { path: 'Posts' } })
        .exec((err, categoryChilds) => {
            if (err) {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({ message: 'CategoryParent not found with id:' + req.params.id });
                }
                return res.status(500).send({ message: err.message });
            }
            return res.status(200).send(categoryChilds);
        })
};

exports.update = (req, res) => {
    CategoryParent.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec((err, categoryParent) => {
        if (err) {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({ message: 'CategoryParent not found with id:' + req.params.id });
            }
            return res.status(500).send({ message: err.message });
        }
        return res.status(200).send(categoryParent);
    })
};

exports.delete = (req, res) => {
    CategoryParent.findByIdAndRemove(req.params.id).exec((err, categoryParent) => {
        if (err) {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({ message: 'CategoryParent not found with id:' + req.params.id });
            }
            return res.status(500).send({ message: err.message });
        }
        return res.status(200).send({ status: true });
    })
};