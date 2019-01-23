const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    RoleName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Roles', RoleSchema);