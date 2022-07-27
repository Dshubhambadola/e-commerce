const ProductsService = require("../../services/products");
const validations = require("./validations");

const productsService = new ProductsService();

const createProduct = async (req, res, next) => {
    try {
        const productData = await validations.createProduct(req.body);
        const { status, message } = await productsService.createProduct({
            ...productData,
            seller: req.user,
        });
        return res.status(status).send(message);
    } catch (error) {
        return next(error);
    }
};

const getProducts = async (req, res, next) => {
    try {
        const reqParams = await validations.getProducts(req.params);
        const { status, message } = await productsService.getProducts({
            ...reqParams,
            user: req.user,
        });
        return res.status(status).send(message);
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    createProduct,
    getProducts,
};
