const UsersService = require("../../services/users");

const usersService = new UsersService();

const getUser = async (req, res, next) => {
    try {
        return res.status(200).send(req.user);
    } catch (error) {
        return next(error);
    }
};

const getSellers = async (req, res, next) => {
    try {
        const { status, message } = await usersService.getSellers();
        return res.status(status).send(message);
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    getUser,
    getSellers,
};
