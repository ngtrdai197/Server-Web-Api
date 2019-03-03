const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// user
const UserSchema = new Schema({
    PhoneNumber: { type: String, unique: true, required: true },
    Password: { type: String, min: 8, max: 24 },
    Date: { type: Date, default: Date.now },
    FullName: { type: String, required: true, trim: true },
    Url: { type: String, trim: true },
    Address: { type: String },
    Posts: [{ type: Schema.Types.ObjectId, ref: 'Posts', required: true }]

});
module.exports = mongoose.model('Users', UserSchema);