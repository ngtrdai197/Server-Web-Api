const Customer = require('../models/customer.model');

module.exports = {
    create: function (req, res) {
        const customer = new Customer(req.body);
        customer.save().then(_customer => {
            res.status(200).send(_customer);
        }).catch(err => {
            res.status(500).send({ message: err.message });
        });
    },

    findOne: function (req, res) {
        Customer.findById(req.body.id).then(customer => {
            if (!customer) return res.status(404).send({ message: `Customer not found with id = ${req.body.id}` });
            res.status(200).send(customer);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({ message: `Customer not found with id = ${req.body.id}` });
            }
            return res.status(500).send({
                message: `Error retrieving Customer with id =${req.body.id}`
            });
        })
    },

    findAll: function (req, res) {
        Customer.find().then(customers => {
            res.status(200).send(customers);
        }).catch(err => {
            res.status(500).send({ message: err.message });
        })
    },

    update: function (req, res) {
        Customer.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(customer => {
            if (!customer) return res.status(404).send({ message: `Customer not found with id: ${req.body.id}` });
            return res.status(200).send(customer);
        }).catch(err => {
            if (err.kind === 'ObjectId')
                return res.status(404).send({ message: `Customer not found with id: ${req.body.id}` });

            return res.status(500).send({ message: `Error updating customer with id + ${req.body.id}` });
        });
    },

    delete: function (req, res) {
        Customer.findByIdAndRemove(req.params.id).then(customer => {
            if (!customer) return res.status(404).send({ message: `Customer not found with id: ${req.body.id}` });

            return res.status(204).send();
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({ message: `Customer not found with id: ${req.body.id}` });
            }
            return res.status(500).send({ message: `Error detele customer with id: ${req.body.id}` });
        });
    }
}