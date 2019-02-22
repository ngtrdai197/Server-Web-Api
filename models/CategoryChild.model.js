const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategoryChildSchema = new Schema({
    CategoryChildName: { type: String, trim: true, required: true },
    CategoryChildUrl: { type: String, trim: true },
    CategoryParent: { type: Schema.Types.ObjectId, ref: 'CategoryParents'},
    Posts: [{ type: Schema.Types.ObjectId, ref: 'Posts'}]
});
module.exports = mongoose.model('CategoryChilds', CategoryChildSchema);
