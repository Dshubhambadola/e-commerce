const OrdersService = require("../../services/orders");
const validations = require("./validations");

const ordersService = new OrdersService();

const createOrder = async (req, res, next) => {
    try {
        const orderData = await validations.createOrder(req.body);
        const { status, message } = await ordersService.createOrder({
            ...orderData,
            user: req.user,
        });
        return res.status(status).send(message);
    } catch (error) {
        return next(error);
    }
};

const getSellerOrders = async (req, res, next) => {
    try {
        const { status, message } = await ordersService.getSellerOrders(req.user);
        return res.status(status).send(message);
    } catch (error) {
        return next(error);
    }
};

const getBuyerOrders = async (req, res, next) => {
    try {
        const { status, message } = await ordersService.getBuyerOrders(req.user);
        return res.status(status).send(message);
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    createOrder,
    getSellerOrders,
    getBuyerOrders,
};
