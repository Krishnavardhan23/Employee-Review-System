const bcrypt = require("bcryptjs");

const comparePassword = async (password, hashedPassword) => {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    } catch (error) {
        throw error;
    }
};

module.exports = comparePassword;
