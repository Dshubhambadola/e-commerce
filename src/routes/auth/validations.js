import { object, string } from "joi";
import constants from "../../constants/index";

const { USER_TYPES } = constants;

const allowedUserTypes = Object.keys(USER_TYPES);

const validator = (schema) => async (payload) => {
    try {
        return schema.validateAsync(payload, { abortEarly: false });
    } catch (error) {
        const formattedMessage = error.details.map((err) => err.message);
        throw new Error(formattedMessage);
    }
};

const register = (payload) => {
    const schema = object({
        name: string().required(),
        mobileNo: string().length(10).pattern(/^[0-9]+$/).required(),
        email: string().email({ tlds: { allow: false } }).required(),
        password: string().min(3).max(15).required(),
        userType: string().required().valid(...allowedUserTypes),
    });
    return validator(schema)(payload);
};

export default {
    register,
};
