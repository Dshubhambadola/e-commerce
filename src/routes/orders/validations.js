const Joi = require("joi");
const { validator } = require("../../utils/index");

const createOrder = (payload) => {
    const schema = Joi.object({
        products: Joi.array().items(
            Joi.object({
                _id: Joi.string().hex().length(24).required(),
                quantity: Joi.number().integer().min(0).required(),
            }),
        ).min(1).required(),
    });
    return validator(schema)(payload);
};

module.exports = {
    createOrder,
};
