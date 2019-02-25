const CategoryChild = require('../models/CategoryChild.model');
const CategoryParent = require('../models/CategoryParent.model');


exports.create = (req, res) => {
    const categoryChild = new CategoryChild(req.body);
    CategoryParent.findById({ _id: req.body.CategoryParent }).exec((err, result) => {
        if (err) {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({ message: 'CategoryParent not found with id:' + req.params.id }); // id cua danh muc cha khong ton tai
            }
            return res.status(500).send({ message: err.message });

        } else {
            // danh muc cha co ton tai trong db
            categoryChild.save().then(_categoryChild => {
                if (_categoryChild) {
                    result.CategoryChilds.push(_categoryChild._id);
                    const cateChildList = result.CategoryChilds;
                    CategoryParent.findByIdAndUpdate({ _id: req.body.CategoryParent }, {
                        CategoryChilds: cateChildList
                    }).exec().then();
                    return res.status(200).send({ status: true, data: _categoryChild });
                }
            }).catch(err => {
                return res.status(500).send({ message: err.message });
            })
        }
    });

};

exports.findAll = (req, res) => {
    CategoryChild.find().then(categoryChilds => {
        return res.status(200).send({ status: true, data: categoryChilds });
    }).catch(err => {
        return res.status(500).send({ message: err.message });
    })
};

exports.findOne = (req, res) => {
    CategoryChild.findById(req.params.id, '-__v').exec((err, categoryChilds) => {
        if (err) {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({ message: 'CategoryChild not found with id:' + req.params.id });
            }
            return res.status(500).send({ message: err.message });
        }
        return res.status(200).send(categoryChilds);
    })
};

// lấy thông tin của danh mục cha thông qua Id của danh mục con
exports.findParentById = (req, res) => {
    CategoryChild.findById({ _id: req.params.id }).select().populate('CategoryParent', '-CategoryChilds -__v').exec((err, data) => {
        if (err) {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({ message: 'CategoryChild not found with id:' + req.params.id })
            }
            return res.status(500).send({ message: err.message });
        }
        return res.status(200).send(data);
    })
};

exports.update = (req, res) => {
    CategoryChild.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec((err, categoryChild) => {
        if (err) {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({ message: 'CategoryChild not found with id:' + req.params.id });
            }
            return res.status(500).send({ message: err.message });
        }
        return res.status(200).send(categoryChild);
    })
};

exports.delete = (req, res) => {
    CategoryChild.findByIdAndRemove(req.params.id).exec((err, categorcategoryChildyParent) => {
        if (err) {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({ message: 'CategoryChild not found with id:' + req.params.id });
            }
            return res.status(500).send({ message: err.message });
        }
        return res.status(200).send({ status: true });
    })
};