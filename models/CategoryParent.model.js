const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategoryParentSchema = new Schema({
    CategoryParentName:{
        type: String,
        trim: true,
        required:true
    },
    CategoryParentUrl:{
        type: String,
        trim: true
    }
});
module.exports = mongoose.model('CategoryParents', CategoryParentSchema);
