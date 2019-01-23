const User = require('../models/user.model');

exports.create = (req, res) => {
    const user = new User(req.body);
    user.save().then(_user => {
        return res.status(200).send(_user);
    }).catch(err => {
        return res.status(500).send({ message: err.message });
    })
};

exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.id).then(user => {
        if (!user) return res.status(404).send({ message: `User not found with id: ${req.body.id}` });
        return res.status(204).send();
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({ message: `User not found with id: ${req.body.id}` });
        }
        return res.status(500).send({ message: `Error detele user with id: ${req.body.id}` });
    });
};
exports.findOne = (req, res) => {
    User.findById(req.params.id).select('-_id -__v -Password') // ẩn fields: _id, __v, Password của user
        .populate('Roles', '-_id -__v') // ẩn fields: _id, __v của Roles trong model User
        .exec((err, user) => {
            if (err) return res.status(404).send({ message: 'User not found with id:' + req.params.id });
            return res.status(200).send(user);
        }).catch(err => {
            return res.status(500).send({ message: err.message });
        })
};

exports.findAll = (req, res) => {
    User.find().select('-_id -__v -Password').populate('Roles', '-_id -__v')
        .then(users => {
            res.status(200).send(users);
        }).catch(err => {
            res.status(500).send({ message: err.message });
        })
};

exports.update = (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(user => {
        if (!user) return res.status(404).send({ message: `User not found with id: ${req.body.id}` });
        return res.status(200).send(user);
    }).catch(err => {
        if (err.kind === 'ObjectId')
            return res.status(404).send({ message: `User not found with id: ${req.body.id}` });

        return res.status(500).send({ message: `Error updating user with id + ${req.body.id}` });
    });
};
