const { verifyToken } = require("../helpers/jwt");
const User = require("../models/User");

async function auth(req) {
  const authorization = req.headers.authorization || "";
  if (!authorization) throw new Error("Invalid token");

  const [type, token] = authorization.split(" ");
  if (type !== "Bearer") throw new Error("Invalid token");

  const payload = verifyToken(token);

  const user = await User.getUserById(payload._id);
  if (!user) throw new Error("Invalid token");
  
  return user;
}

module.exports = auth;
