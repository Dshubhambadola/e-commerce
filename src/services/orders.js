/* eslint-disable class-methods-use-this */
const Orders = require("../models/orders");
const Products = require("../models/products");

class OrdersService {
    async createOrder({ products, user }) {
        const dbProducts = await Products.find({
            _id: {
                $in: products.map(({ _id }) => _id),
            },
        }).populate("seller");

        const sellerCount = Array.from(new Set(dbProducts.map(({ seller }) => seller._id || ""))).length;
        if (products.length !== dbProducts.length) {
            return {
                status: 400,
                message: "Invalid Order Request - One or more product not found",
            };
        }
        if (sellerCount !== 1) {
            return {
                status: 400,
                message: "Invalid Order Request - Order for one seller accepted at a time",
            };
        }

        const newOrder = await new Orders({
            products,
            buyer: user._id,
            seller: dbProducts[0].seller._id,
        }).save();

        return {
            status: 200,
            message: newOrder,
        };
    }

    async getSellerOrders({ _id: sellerId }) {
        const orders = await Orders.find({ seller: sellerId })
            .populate("products._id", "name + price").populate("buyer", "name + email");
        return {
            status: 200,
            message: orders.map(({ _doc: order }) => ({
                ...order,
                products: order.products.map(({ _doc: product }) => {
                    const { _id, name, price } = product._id;
                    return {
                        _id,
                        name,
                        price,
                        quantity: product.quantity,
                    };
                }),
            })),
        };
    }

    async getBuyerOrders({ _id: buyerId }) {
        const orders = await Orders.find({ buyer: buyerId })
            .populate("products._id", "name + price").populate("seller", "name + email");
        return {
            status: 200,
            message: orders.map(({ _doc: order }) => ({
                ...order,
                products: order.products.map(({ _doc: product }) => {
                    const { _id, name, price } = product._id;
                    return {
                        _id,
                        name,
                        price,
                        quantity: product.quantity,
                    };
                }),
            })),
        };
    }
}

module.exports = OrdersService;
