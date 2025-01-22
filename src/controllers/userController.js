const Userservice = require("../services/usersServices");
const response = require("../utils/response");

/**
 * Function to be implemented in userController.js:-
 * getUser : Get user by username or email
 * getUserById : Get user by id
 * getAllUser :  Get all users
 * removeUser :  Remove user by id
 * updateUser :  Update user by id
*/



//Access by Admin
const getAllUser = async (req, res) => {
  try {
    const Users = await Userservice.find({});
    if (Users.length === 0)
      return res.status(400).send(response.sendFailed("No Users Found"));
    return res.status(200).send(response.sendSuccess("Users Found", Users));
  } catch (err) {
    return res.status(500).send(response.sendError(err));
  }
};

//Fetch user by id
const getUserById = async (req, res) => {
  let userId = req.body.id || req.query.id || req.params.id;
  try {
    const User = await Userservice.findById(userId);
    if (!User)
      return res.status(400).send(response.sendFailed("User NOT Found"));
    return res.status(200).send(response.sendSuccess("User Found:", User));
  } catch {
    return res.status(500).send(response.sendError(err));
  }
};

//General get function to handle different filter options
//Mainly for ADMIN usage
const getUser = async (req, res) => {
  let queryObjectToFind = {};
  const keyObject = {...req.body, ...req.query, ...req.params};
  console.log(keyObject);
  for (let key in keyObject) {
    //Make the query case insensitive
    queryObjectToFind[key] = { $regex: new RegExp(`^${keyObject[key]}$`), $options: "i" } ;
  }
  try {
    const Users = await Userservice.find(queryObjectToFind);
    if (Users.length === 0)
      return res.status(400).send(response.sendFailed("No User Found"));
    return res.status(200).send(response.sendSuccess("User Found", Users));
  } catch (err) {
    return res.status(500).send(response.sendError(err));
  }
};

//Remove user by id
const removeUser = async (req, res) => {
    let reqUserId = req.body.id || req.query.id || req.params.id;
      let queryObjectToFind = { _id: reqUserId };
    
      try {
        const User = await Userservice.deleteOne(queryObjectToFind);
        if (!User)
          return res.status(400).send(response.sendFailed("User doesn't Exist"));
    
        return res.status(200).send(response.sendSuccess("User Deleted", User));
      } catch (err) {
        return res.status(500).send(response.sendError(err));
      }
};

//Update user by id
const updateUser = async (req, res) => {
     let reqUserId = req.body.id || req.query.id || req.params.id;
      let queryObjectToFind = { _id: reqUserId };
    
      try {
        const User = await Userservice.findById(queryObjectToFind);
        if (!User) {
          return res.status(400).send(response.sendFailed("User doesn't Exist"));
        }

        User.name = req.body.name || User.name;
        User.username = req.body.username || User.username;
        User.email = req.body.email || User.email;
        User.password = req.body.password || User.password;
        
        //Only if user is admin
        User.userType = req.body.userType || User.userType;
        

        const updatedUser = await User.save();
        return res
          .status(200)
          .send(response.sendSuccess("User details updated", updatedUser));
      } catch (err) {
        return res.status(500).send(response.sendError(err));
      }
};

module.exports = {
  getUser,
  getUserById,
  getAllUser,
  removeUser,
  updateUser,
};
