const userServices = require("../services/usersServices");
const response = require("../utils/response");

/**
 * Create new User in the app
 * (If the user is not already preseent in the DB)
 */
const signup = async (req, res) => {
  const userObjectToCreateInDB = {
    name: req.body.name,
    username: req.body.username || req.body.email,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const newUser = await userServices.create(userObjectToCreateInDB);
    res.status(201).response.sendSuccess("User created successfully", newUser);
  } catch (error) {
    res.status(500).response.sendError("Error creating user", error);
  }
};

//Login into the app
const signin = async (req, res) => {
  const userObjectToLogin = {
    username: req.body.username,
    email: req.body.email,
  };

  try {
    const user = await userServices.find(userObjectToLogin);
    res.status(200).response.success("User logged in successfully", user);
  } catch (error) {
    res.status(500).response.error("Error logging in", error);
  }
};

module.exports = {
  signup,
  signin,
};
