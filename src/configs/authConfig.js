require("dotenv").config();
module.exports = {
    Secret_Key: process.env.SECRET_KEY,
    SALT_ROUNDS: 10,
};
