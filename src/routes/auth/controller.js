const AuthService = require("../../services/auth");
const validations = require("./validations");

const authService = new AuthService();

const register = async (req, res, next) => {
    try {
        const registrationData = await validations.register(req.body);
        const { status, message } = await authService.register(registrationData);
        return res.status(status).send(message);
    } catch (error) {
        return next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const loginData = await validations.login(req.body);
        const { status, message } = await authService.login(loginData);

        return res.status(status).send(message);
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    register,
    login,
};
