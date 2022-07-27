const mongoose = require("mongoose");

const { Schema } = mongoose;

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        requireed: true,
    },
}, {
    collection: "catalogs",
    timestamps: true,
});

const Catalogs = mongoose.model("Catalogs", schema);
module.exports = Catalogs;
