const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// user
const UserSchema = new Schema({
    PhoneNumber: {
        type: String,
        unique: true,
        required: true
    },
    Password: {
        type: String,
        min: 8,
        max: 24,
        required: true
    },
    Date: {
        type: Date,
        default: Date.now
    },
    FullName: { type: String, required: true, trim: true },
    Url: { type: String, trim: true },
    Address: {
        type: String
    }
});
module.exports = mongoose.model('Users', UserSchema);