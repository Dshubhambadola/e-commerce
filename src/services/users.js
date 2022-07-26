/* eslint-disable class-methods-use-this */
import Users from "../models/users";

const logger = require("pino")();

class UserServices {
    async createUser(usersData) {
        try {
            const {
                name, email, mobileNo, registrationId, userType,
            } = usersData;
            const newUser = new Users({
                name,
                email,
                mobileNo,
                registrationId,
                userType,
            });
            await newUser.save();
            return {
                status: "200",
                message: "Success",
            };
        } catch (err) {
            throw logger.error(err);
        }
    }
}

export default UserServices;
