const jwt = require("jsonwebtoken");
const JWT_SECRET = "sebuah pesan rahasia1";

const signToken = (data) => {
  return jwt.sign(data, JWT_SECRET);
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = {
  signToken,
  verifyToken,
};
