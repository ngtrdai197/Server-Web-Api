const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategoryParentSchema = new Schema({
    CategoryParentName: { type: String, trim: true, required: true },
    CategoryParentUrl: { type: String, trim: true },
    CategoryChilds: [{ type: Schema.Types.ObjectId, ref: 'CategoryChilds' }],
    Area: { type: Schema.Types.ObjectId, ref: 'Areas', required: true },
});
module.exports = mongoose.model('CategoryParents', CategoryParentSchema);
