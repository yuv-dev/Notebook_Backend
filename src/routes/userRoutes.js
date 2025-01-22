const express = require("express");
const router = express.Router();

const UserController = require("../controllers/userController");
const { authenticate } = require("../middlewares/authentication");
const {verifyUser, isAdmin} = require("../middlewares/authorization");
//Routes for user CRUD operations

/**
 * All the routes here are protected and only accessible to admin users.
 */

router.get("/all/", authenticate, isAdmin, UserController.getAllUser);
router.get("/:id", authenticate, verifyUser, UserController.getUserById);
router.get("/", authenticate, isAdmin, UserController.getUser);
router.put("/:id",authenticate,verifyUser,  UserController.updateUser);
router.delete("/:id",authenticate,verifyUser, UserController.removeUser);

module.exports = router;
 