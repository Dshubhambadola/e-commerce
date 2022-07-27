const mongoose = require("mongoose");
const constants = require("../constants/index");

const allowedUserTypes = Object.keys(constants.USER_TYPES);

const { Schema } = mongoose;
const { ObjectId } = mongoose;

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        index: true,
        required: true,
        unique: true,
    },
    mobileNo: {
        type: String,
        required: true,
    },
    registrationId: {
        type: ObjectId,
        required: true,
    },
    userType: {
        type: String,
        required: true,
        enum: allowedUserTypes,
    },
}, {
    collection: "users",
    timestamps: true,
});

const User = mongoose.model("User", schema);
module.exports = User;
