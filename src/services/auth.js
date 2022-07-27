/* eslint-disable class-methods-use-this */
const crypto = require("crypto");
const { get } = require("lodash");
const jwt = require("jsonwebtoken");

const LoginRegistration = require("../models/loginRegistration");
const UsersService = require("./users");

const allUsersServices = new UsersService();

const {
    JWT_SECRET, CRYPTO_SECRET, CRYPTO_ALGORITHM,
} = process.env;

const jwtSecretKey = JWT_SECRET;
const jwtExpirySeconds = 60 * 60 * 24 * 2;

class AuthService {
    async register(registrationData) {
        try {
            const {
                name, mobileNo, email, password, userType,
            } = registrationData;
            const hashedPassword = crypto.pbkdf2Sync(password, CRYPTO_SECRET, 10000, 512, CRYPTO_ALGORITHM)
                .toString("hex");

            const userDetails = await LoginRegistration.findOne({ email });
            const userExists = get(userDetails, "email", false);
            if (userExists) {
                throw new Error("Email already exists! Please Login.");
            }

            const createRegistration = new LoginRegistration({
                email,
                password: hashedPassword,
            });
            const userRegistration = await createRegistration.save();
            const userData = {
                name,
                mobileNo,
                email,
                registrationId: userRegistration._id,
                userType,
            };
            await allUsersServices.createUser(userData);
            const token = this.createJwt(email);
            return { status: 201, message: { token } };
        } catch (err) {
            throw new Error(err || "error in creating user");
        }
    }

    async login(loginData) {
        try {
            const { email, password } = loginData;
            const userDetails = await LoginRegistration.findOne({ email });
            const hashedPassword = crypto.pbkdf2Sync(password, CRYPTO_SECRET, 10000, 512, CRYPTO_ALGORITHM)
                .toString("hex");
            const dbHashedPassword = get(userDetails, "password");
            if (dbHashedPassword === hashedPassword) {
                const token = this.createJwt(email);
                return { status: 201, message: { token } };
            }
            return { status: 401, message: "Invalid login credentials. Please check!" };
        } catch (err) {
            throw new Error(err || "login error");
        }
    }

    createJwt(email) {
        return jwt.sign({ email }, jwtSecretKey, {
            // Note: using default HMAC SHA 256 algorithm to sign
            expiresIn: jwtExpirySeconds,
        });
    }
}

module.exports = AuthService;
