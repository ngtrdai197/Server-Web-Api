const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    PostName: { type: String, trim: true, required: true, text: true },
    PostUrl: [{ type: String }],
    Status: {
        type: Boolean, default: false // chưa được bán
    },
    Price: { type: String, required: true },
    Address: { required: true, type: String },
    PostDate: { type: Date, default: Date.now },
    PhoneNumber: { type: String, required: true, },
    Description: { type: String },
    UserId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    AreaId: { type: Schema.Types.ObjectId, ref: 'Areas', required: true },
    CategoryChildId: { type: Schema.Types.ObjectId, ref: 'CategoryChilds', required: true },
    FileId: [{ type: Schema.Types.ObjectId, ref: 'Files' }]
});
module.exports = mongoose.model('Posts', PostSchema);
