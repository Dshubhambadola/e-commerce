/* eslint-disable class-methods-use-this */
const Users = require("../models/users");
const Catalogs = require("../models/catalogs");
const { USER_TYPES } = require("../constants/index");

class UsersService {
    async createUser(usersData) {
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
        const { _id: userId } = await newUser.save();
        if (userType === USER_TYPES.SELLER) {
            const newCatalog = new Catalogs({
                name: `${name}'s catalog`,
                seller: userId,
            });
            await newCatalog.save();
        }
        return {
            status: 200,
            message: "Success",
        };
    }

    async getUser(email) {
        return Users.findOne({ email }).exec();
    }

    async getSellers() {
        const sellers = await Users.find({ userType: USER_TYPES.SELLER }).exec();
        return {
            status: 200,
            message: sellers,
        };
    }
}

module.exports = UsersService;
