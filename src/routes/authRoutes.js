const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/authController");
const isUserExisitng = require("../middlewares/isUserExisting");
const {validateUserRegisterData} = require("../middlewares/Validators/signupValidator");
const {validateUserSignInData} = require("../middlewares/Validators/SignInValidator");

//Routes for login and signup
router.post("/signup", validateUserRegisterData, isUserExisitng,  AuthController.signup);
router.post("/signin", validateUserSignInData, AuthController.signin);

module.exports = router;
