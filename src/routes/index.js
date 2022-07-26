import {
    Router, json, urlencoded, text,
} from "express";

import authRouter from "./auth/routes";

const logger = require("pino")();

const appRouter = Router();

appRouter.use(json());
appRouter.use(urlencoded({ extended: true }));
appRouter.use(text());

appRouter.use("/auth", authRouter);

appRouter.use("*", (error, _, res, next) => {
    if (error) {
        logger.error(error.message);
        logger.error(error.stack);
        res.status(error.code || 500).send(error.message);
        return;
    }
    next();
});

appRouter.all("*", (_, res) => {
    res.status(404).send("Route not found");
});

export default appRouter;
