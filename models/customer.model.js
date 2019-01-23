const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
    FullName: {
        type: String,
        required: true
    },
    Address: { type: String },
    PhoneNumber: {
        type: String,
        required: true
    },
    Age: {
        type: Number,
        min: 18,
        max: 100,
    },
})

module.exports = mongoose.model('Customer', CustomerSchema);