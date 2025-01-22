const UserServices = require("../services/usersServices");
const {sendFailed} = require('../utils/response');

const isUserExisitng = async (req, res, next) => {
  const SearchObj =  { email, username } = req.body;
  const user = await UserServices.findByEmailorUsername(SearchObj);
  console.log("isUserExisitng",user);
  if(user) {
    return res.status(404).send(sendFailed("User already exists"));
  }

  next();
}

module.exports = isUserExisitng;