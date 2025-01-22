const { sendFailed } = require("../utils/response");
const { userType } = require("../utils/constants");
/**
 * For ADMIN access level pivilages
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const isAdmin = (req, res, next) => {
  if (req.userType !== userType.admin) {
    return res
      .status(403)
      .send(sendFailed("Access denied. You are not an admin"));
  }
  next();
};

/**
 * To authorise that the same user is trying to access the data
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const verifyUser = (req, res, next) => {
  if (req.userId !== req.params.id && req.userType !== userType.admin) {
    return res
      .status(403)
      .send(sendFailed("Access denied. You are not the owner of this ID"));
  }
  next();
};

module.exports = { verifyUser, isAdmin };
