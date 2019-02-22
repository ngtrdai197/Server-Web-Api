var mongoose = require("mongoose");

var FileSchema = new mongoose.Schema({
    FileName: {
        type: String,
        required: true
    },
    FileOriginal: {
        type: String,
        required: true
    },
    UploadDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("Files", FileSchema);