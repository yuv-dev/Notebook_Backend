const bcrypt = require("bcrypt");

const doEncryption = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

const compare = async (password, hash) => {
  return await bcrypt.compare(password, hash);
}

module.exports = { doEncryption, compare };