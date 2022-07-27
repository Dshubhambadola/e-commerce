const router = require("express").Router();
const controller = require("./loginRegistrationController");

router.post("/register", controller.registration);
router.post("/login", controller.login);

module.exports = router;
