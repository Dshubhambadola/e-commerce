const mongoose = require("mongoose");

const { Schema } = mongoose;

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    catalog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Catalogs",
        required: true,
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        requireed: true,
    },
}, {
    collection: "products",
    timestamps: true,
});

schema.index({ name: 1, catalog: 1 }, { unique: true });

const Products = mongoose.model("Products", schema);
module.exports = Products;
