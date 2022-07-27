const mongoose = require("mongoose");

const { Schema } = mongoose;

const schema = new Schema({
    products: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products",
                required: true,
            },
            quantity: {
                type: Number,
                min: [0, "Product quantity cannot be zero"],
                required: true,
            },
        },
    ],
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    collection: "orders",
    timestamps: true,
});

const Orders = mongoose.model("Orders", schema);
module.exports = Orders;
