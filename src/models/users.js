import mongoose, { model } from "mongoose";
import USER_TYPES from "../constants/index";

const allowedUserTypes = Object.keys(USER_TYPES);

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

const User = model("User", schema);
export default User;
