/* eslint-disable class-methods-use-this */
const Catalogs = require("../models/catalogs");
const Products = require("../models/products");
const { USER_TYPES } = require("../constants/index");

class ProductsService {
    async createProduct({ name, price, seller }) {
        const { _id: catalogId } = await Catalogs.findOne({ seller: seller._id });
        const newProduct = await new Products({
            name,
            price,
            catalog: catalogId,
            seller: seller._id,
        }).save();
        return {
            status: 200,
            message: newProduct,
        };
    }

    async getProducts({ sellerId, user }) {
        if (user.userType === USER_TYPES.SELLER && user._id.toString() !== sellerId) {
            return {
                status: 401,
                message: "Cannot access products of other sellers",
            };
        }
        const { _id: catalogId } = await Catalogs.findOne({ seller: sellerId });
        const products = await Products.find({ catalog: catalogId });
        return {
            status: 200,
            message: products,
        };
    }
}

module.exports = ProductsService;
