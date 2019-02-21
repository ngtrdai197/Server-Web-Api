const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    PostName: {
        type: String,
        trim: true,
        required: true
    },
    PostUrl: [{ type: String }],
    Status: {
        type: Boolean,
        default: false // chưa được bán
    },
    Price: {
        type: Number,
        required: true
    },
    Address: {
        required: true,
        type: String
    },
    PostDate: {
        type: Date,
        default: Date.now
    },
    PhoneNumber: {
        type: String,
        required: true,
    },
    Description: {
        type: String
    },
    UserId: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
    CategoryChildId: [{ type: Schema.Types.ObjectId, ref: 'CategoryChilds' }]
});
module.exports = mongoose.model('Posts', PostSchema);
