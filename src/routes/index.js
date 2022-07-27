const express = require("express");
const logger = require("pino")();
const { authenticate } = require("../middlewares/authenticate");

const appRouter = express.Router();

const authRouter = require("./auth/routes");
const usersRouter = require("./users/routes");
const productsRouter = require("./products/routes");
const ordersRouter = require("./orders/routes");

appRouter.use(express.json());
appRouter.use(express.urlencoded({ extended: true }));
appRouter.use(express.text());

appRouter.use("/auth", authRouter);
appRouter.use(authenticate);
appRouter.use(usersRouter);
appRouter.use(productsRouter);
appRouter.use(ordersRouter);

appRouter.use("*", (error, _, res, next) => {
    if (error) {
        logger.error(error.message);
        logger.error(error.stack);
        res.status(500).send(error.message || "Internal Server Error");
        return;
    }
    next();
});

appRouter.all("*", (_, res) => {
    res.status(404).send("Route not found");
});

module.exports = appRouter;
