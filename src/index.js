import express from "express";
import { createServer } from "http";
import { urlencoded, json } from "body-parser";
import cors from "cors";
import { connect, connection } from "mongoose";
import session from "express-session";

require("dotenv").config();

const app = express();
const server = createServer(app);
const logger = require("pino")();

const {
    MONGODB_URI, PORT, SESSION_SECRET,
} = process.env;

app.use((req, res, next) => {
    // NOTE: * will allow all origins which is not what we want in production
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept",
    );
    next();
});
// NOTE: * will allow all origins which is not what we want in production
app.options("*", cors());
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(session({
    secret: SESSION_SECRET, cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false,
}));
// Configure mongoose

connect(
    MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
    },
);
const db = connection;
db.on("error", (error) => {
    logger.error("Mongoose error", error);
});
db.once("open", async () => {
    logger.info("Connected to mongoose");
});
app.use(require("./routes").default);

// PORT to be taken from .env
server.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
