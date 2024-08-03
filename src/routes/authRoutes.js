const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/authController");

//Routes for login and signup
router.post("/signup",  AuthController.signup);
router.post("/signin",  AuthController.signin);

module.exports = router;
