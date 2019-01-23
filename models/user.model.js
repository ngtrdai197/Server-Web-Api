const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// user
const UserSchema = new Schema({
    UserName: {
        type: String,
        min: 8,
        max: 24,
        unique: true,
        required: true
    },
    Password: {
        type: String,
        min: 8,
        max: 24,
        required: true
    },
    Email: {
        type: String,
        required: true,
        trim: true,
        match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    },
    Roles: [{ type: Schema.Types.ObjectId, ref: 'Roles' }],
    Date: {
        type: Date,
        required: true,
        default: Date.now()
    }
});
module.exports = mongoose.model('Users', UserSchema);