const userServices = require("../services/usersServices");
const {
  sendError,
  sendSuccess,
  sendFailed,
  sendSigninSuccess,
} = require("../utils/response");
const jwt = require("jsonwebtoken");
const { Secret_Key } = require("../configs/authConfig");
const { encrypt, compare } = require("../utils/encryption");

/**
 * Create new User in the app
 * (If the user is not already preseent in the DB)
 */
const signup = async (req, res) => {
  const userObjectToCreateInDB = {
    name: req.body.name,
    username: req.body.username || req.body.email,
    email: req.body.email,
    password: await encrypt(req.body.password),
  };

  try {
    const newUser = await userServices.create(userObjectToCreateInDB);
    res.status(201).send(sendSuccess("User created successfully", newUser));
  } catch (error) {
    res.status(500).send(sendError("Error creating user", error));
  }
};

//Login into the app
const signin = async (req, res) => {
  const userObjectToLogin = {
    $or: [{ username: req.body.username }, { email: req.body.email }],
  };

  try {
    const user = await userServices.findOne(userObjectToLogin);
    if (!user) {
      return res.status(404).send(sendFailed("User not found"));
    }
    const isPasswordValid = compare(req.body.password, user.password) ;
     if (!isPasswordValid) {
      return res.status(401).send(sendFailed("Invalid password"));
    }
    const token = jwt.sign(
      { userId : user._id, username: user.username, userType : user.userType },
      Secret_Key,
      { expiresIn: 86400 }
    );   
    res
      .status(200)
      .send(sendSigninSuccess("User logged in successfully", user, token));
  } catch (error) {
    res.status(500).send(sendError("Error logging in", error));
  }
};

module.exports = {
  signup,
  signin,
};
