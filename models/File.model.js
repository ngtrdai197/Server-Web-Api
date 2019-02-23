const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FileSchema = new mongoose.Schema({
    FileName: {
        type: String,
        required: true
    },
    UploadDate: {
        type: Date,
        default: Date.now
    },
    PostId: { type: Schema.Types.ObjectId, ref: 'Posts', required: true }
});

module.exports = mongoose.model("Files", FileSchema);