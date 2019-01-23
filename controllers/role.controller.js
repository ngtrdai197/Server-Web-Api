const Role = require('../models/role.model');

exports.create = (req, res) => {
    const role = new Role(req.body);
    role.save().then(role => {
        return res.status(200).send(role);
    }).catch(err => {
        return res.status(500).send({ message: err.message });
    })
};

exports.findAll = (req, res) => {
    Role.find().then(roles => {
        return res.status(200).send(roles);
    }).catch(err => {
        return res.status(500).send({ message: err.message });
    })
};

exports.findOne = (req, res) => {
    Role.findById(req.params.id).then(role => {
        if (!role) return res.status(404).send(`Role not found with id: ${req.params.id}`);
        return res.status(200).send(role);
    }).catch(err => {
        return res.status(500).send({ message: err.message });
    })
};

exports.update = (req, res) => {
    Role.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(role => {
        if (!role) return res.status(404).send({ message: `Role not found with id: ${req.body.id}` });
        return res.status(200).send(role);
    }).catch(err => {
        if (err.kind === 'ObjectId')
            return res.status(404).send({ message: `Role not found with id: ${req.body.id}` });

        return res.status(500).send({ message: `Error updating Role with id + ${req.body.id}` });
    });
};

exports.delete = (req, res) => {
    Role.findByIdAndRemove(req.params.id).then(role => {
        if (!role) return res.status(404).send({ message: `Role not found with id: ${req.body.id}` });
        return res.status(204).send();
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({ message: `Role not found with id: ${req.body.id}` });
        }
        return res.status(500).send({ message: `Error detele Role with id: ${req.body.id}` });
    });
}

