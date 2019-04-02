const User = require('../models/user.model');

exports.create = (req, res) => {
    const user = new User(req.body);
    User.find({
        PhoneNumber: user.PhoneNumber
    }).then(result => {
        if (result.length <= 0) {
            user.save().then(_user => {
                if (_user) {
                    res.status(200).send({
                        status: true,
                        data: _user
                    });
                }
            }).catch(err => {
                return res.status(500).send({
                    message: err.message
                });
            })
        } else if (user.Password.length < 8) {
            return res.status(400).send({
                status: false,
                message: 'Password quá ngắn (phải lớn hơn 8 kí tự). Kiểm tra lại !!!'
            });
        } else {
            return res.status(400).send({
                status: false,
                message: 'PhoneNumber đã tồn tại. Kiểm tra lại !!!'
            });
        }
    })

};

exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.id).exec((err, user) => {
        if (err) {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'User not found with id:' + req.params.id
                });
            }
            return res.status(500).send({
                message: err.message
            });
        }
        return res.status(200).send({
            status: true
        });
    })
};
exports.findOne = (req, res) => {
    User.findById(req.params.id, '-Password -__v').exec((err, user) => {
        if (err) {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'User not found with id:' + req.params.id
                });
            }
            return res.status(500).send({
                message: err.message
            });
        }
        return res.status(200).send(user);
    })
};

exports.findAll = (req, res) => {
    User.find().then(users => {
        res.status(200).send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    })
};

exports.update = (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }).exec((err, user) => {
        if (err) {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'User not found with id:' + req.params.id
                });
            }
            return res.status(500).send({
                message: err.message
            });
        }
        return res.status(200).send(user);
    })
};

exports.upload_image = (req, res) => {
    console.log(req.params.id);

    User.findById({
        _id: req.params.id
    }).exec((err, result) => {
        if (err) {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'User not found with id:' + req.params.id
                }); // id cua danh muc con khong ton tai
            }
            return res.status(500).send({
                message: err.message
            });

        } else {
            // user ton tai trong db
            console.log(req.files);;
            const imgUrl = `https://node-server-api.azurewebsites.net/images/users/${req.files[0].filename}`;
            User.findByIdAndUpdate({
                _id: req.params.id
            }, {
                Url: imgUrl,
            }).exec().then(() => {
                return res.status(200).send({
                    status: 200,
                    message: 'Already upload !!!'
                })
            });

        }
    });
}