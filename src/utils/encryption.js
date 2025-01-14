const bcrypt = require("bcrypt");

const encrypt = async (plainText) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(plainText, salt);
  return hash;
}

const compare = async (password, hash) => {
  return await bcrypt.compare(password, hash);
}


module.exports = { encrypt, compare };