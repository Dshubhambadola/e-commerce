const router = require("express").Router();
const controller = require("./controller");
const { permit } = require("../../middlewares/authorize");
const { USER_TYPES } = require("../../constants/index");

router.post("/product/create", permit(USER_TYPES.SELLER), controller.createProduct);
router.get("/products/:sellerId", controller.getProducts);

module.exports = router;
