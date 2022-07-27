const jwt = require("jsonwebtoken");
const UsersService = require("../services/users");

const jwtSecretKey = process.env.JWT_SECRET;

const usersService = new UsersService();

const authenticate = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        res.status(400).send("Token not supplied!");
    }
    const decoded = jwt.verify(token, jwtSecretKey, {
        algorithm: process.env.JWT_ALGORITHM,
    });
    if (decoded) {
        const user = await usersService.getUser(decoded.email);
        if (!user) {
            res.status(403).send("Unauthorized access!");
        }
        req.user = user;
        next();
    } else {
        res.status(403).send("Unauthorized access!");
    }
};

module.exports = {
    authenticate,
};
