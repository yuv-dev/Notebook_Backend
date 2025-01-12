const express = require("express");
const router = express.Router();

const UserController = require("../controllers/userController");

//Routes for user CRUD operations

router.get("/all/", UserController.getAllUser);
router.get("/:id", UserController.getUserById);
router.get("/", UserController.getUser);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.removeUser);

module.exports = router;
