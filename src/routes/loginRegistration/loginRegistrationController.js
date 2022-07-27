const LoginRegistrationServices = require("../../services/loginRegistrations");

const allLoginRegistrationServices = new LoginRegistrationServices();

const registration = async (req, res) => {
    try {
        const registrationsData = req.body;
        await allLoginRegistrationServices.registration(registrationsData);
        return res.status(201).send("Registration done successfully");
    } catch (error) {
        throw res.status(500).send(error || "Registration failed");
    }
};

const login = async (req, res) => {
    try {
        const loginData = req.body;
        const { status, message } = await allLoginRegistrationServices.login(loginData);

        return res.status(status).send(message);
    } catch (error) {
        throw res.status(500).send(error || "Registration failed");
    }
};
module.exports = {
    registration,
    login,
};
