const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AreaSchema = new Schema({
    AreaName: { type: String, required: true, trim: true },
})

module.exports = mongoose.model('Areas', AreaSchema);