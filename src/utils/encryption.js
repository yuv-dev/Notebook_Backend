const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../configs/authConfig");

const encrypt = (plainText) => {
  const salt =  bcrypt.genSaltSync(SALT_ROUNDS);
  const hash =  bcrypt.hashSync(plainText, salt);
  return hash;
}

const compare =  (password, hash) => {
  return bcrypt.compareSync(password, hash);
}



module.exports = { encrypt, compare };