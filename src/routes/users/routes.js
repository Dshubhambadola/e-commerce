const router = require("express").Router();
const controller = require("./controller");
const { permit } = require("../../middlewares/authorize");
const { USER_TYPES } = require("../../constants/index");

router.get("/user", controller.getUser);
router.get("/sellers", permit(USER_TYPES.BUYER), controller.getSellers);

module.exports = router;
