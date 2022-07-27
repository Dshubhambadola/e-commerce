require("dotenv").config();
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();
const server = http.createServer(app);
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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: SESSION_SECRET, cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false,
}));
// Configure mongoose

mongoose.connect(
    MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
    },
);
const db = mongoose.connection;
db.on("error", (error) => {
    logger.error("Mongoose error", error);
});
db.once("open", async () => {
    logger.info("Connected to mongoose");
});
app.use(require("./routes"));

// PORT to be taken from .env
server.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
