const mongoose = require("mongoose");

const { Schema } = mongoose;

const schema = new Schema({
    email: {
        type: String,
        index: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    collection: "loginRegistration",
    timestamps: true,
});

const LoginRegistration = mongoose.model("LoginRegistration", schema);
module.exports = LoginRegistration;
