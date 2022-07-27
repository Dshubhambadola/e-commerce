const router = require("express").Router();
const controller = require("./controller");
const { permit } = require("../../middlewares/authorize");
const { USER_TYPES } = require("../../constants/index");

router.post("/order/create", permit(USER_TYPES.BUYER), controller.createOrder);
router.get("/orders/seller", permit(USER_TYPES.SELLER), controller.getSellerOrders);
router.get("/orders/buyer", permit(USER_TYPES.BUYER), controller.getBuyerOrders);

module.exports = router;
