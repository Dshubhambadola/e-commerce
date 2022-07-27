const express = require("express");

const router = express.Router();

router.use("/login", require("./loginRegistrationRoutes"));

module.exports = router;
