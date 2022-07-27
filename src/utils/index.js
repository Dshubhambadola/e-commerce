const validator = (schema) => async (payload) => {
    try {
        return schema.validateAsync(payload, { abortEarly: false });
    } catch (error) {
        const formattedMessage = error.details.map((err) => err.message);
        throw new Error(formattedMessage);
    }
};

module.exports = {
    validator,
};
