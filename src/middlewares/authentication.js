const jwt = require("jsonwebtoken");
const { sendFailed } = require("../utils/response");
const { Secret_Key } = require("../configs/authConfig");

const authenticate = (req, res, next) => {

  const token = req.body["accesstoken"] || req.headers["access-token"] || null;
  if (!token) {
    return res.status(401).send(sendFailed("Access denied. No token provided"));
  }

  try {
    const decoded = jwt.verify(token, Secret_Key);
    req.username = decoded.username;
    req.userType = decoded.userType;
    req.userId = decoded.userId;
  } catch (error) {
    return res.status(400).send(sendFailed("Invalid token"));
  }

  next();
};

module.exports = { authenticate };
