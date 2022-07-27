const Joi = require("joi");
const { USER_TYPES } = require("../../constants/index");
const { validator } = require("../../utils/index");

const allowedUserTypes = Object.keys(USER_TYPES);

const register = (payload) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        mobileNo: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().min(3).max(15).required(),
        userType: Joi.string().required().valid(...allowedUserTypes),
    });
    return validator(schema)(payload);
};

const login = (payload) => {
    const schema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().required(),
    });
    return validator(schema)(payload);
};

module.exports = {
    register,
    login,
};
