import mongoose, { model } from "mongoose";

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

const LoginRegistration = model("LoginRegistration", schema);
export default LoginRegistration;
