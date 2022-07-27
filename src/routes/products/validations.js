const Joi = require("joi");
const { validator } = require("../../utils/index");

const createProduct = (payload) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().min(0).required(),
    });
    return validator(schema)(payload);
};

const getProducts = (payload) => {
    const schema = Joi.object({
        sellerId: Joi.string().hex().length(24).required(),
    });
    return validator(schema)(payload);
};

module.exports = {
    createProduct,
    getProducts,
};
