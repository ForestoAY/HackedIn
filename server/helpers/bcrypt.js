const bcrypt = require("bcryptjs");

async function hashPassword(password) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

async function comparePassword(password, hash) {
  const isValidPassword = await bcrypt.compare(password, hash);
  return isValidPassword;
}

module.exports = {
  hashPassword,
  comparePassword,
};
