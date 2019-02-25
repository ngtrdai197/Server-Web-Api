const Area = require('../models/Area.model');

exports.create = (req, res) => {
    const area = new Area(req.body);
    area.save().then(_area => {
        if (_area) {
            res.status(200).send({ status: true, data: _area });
        }
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })

};


exports.findAll = (req, res) => {
    Area.find({}, '-__v').then(areas => {
        return res.status(200).send({ status: true, data: areas });
    }).catch(err => {
        return res.status(500).send({ message: err.message });
    })
};

exports.findOne = (req, res) => {
    Area.findById(req.params._id, '-__v').exec((err, area) => {
        if (err) {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({ message: 'Area not found with id:' + req.params.id });
            }
            return res.status(500).send({ message: err.message });
        }
        return res.status(200).send(area);
    })
};

exports.update = (req, res) => {
    Area.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec((err, area) => {
        if (err) {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({ message: 'Area not found with id:' + req.params.id });
            }
            return res.status(500).send({ message: err.message });
        }
        return res.status(200).send(area);
    })
};

exports.delete = (req, res) => {
    Area.findByIdAndRemove(req.params.id).exec((err, area) => {
        if (err) {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({ message: 'Area not found with id:' + req.params.id });
            }
            return res.status(500).send({ message: err.message });
        }
        return res.status(200).send({ status: true });
    })
};