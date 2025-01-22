const express = require("express");
const router = express.Router();

const NotesController = require("../controllers/notesController");
const { authenticate   } = require("../middlewares/authentication");
const { verifyUser, isAdmin } = require("../middlewares/authorization");

//Routes for note CRUD operations  
router.post("/", authenticate, verifyUser,  NotesController.addNotes);
router.get("/", authenticate, verifyUser,  NotesController.getNotes);
router.get("/:id", authenticate, verifyUser,  NotesController.getNoteById);
router.get("/search/:keyword", authenticate, verifyUser,  NotesController.searchNotes);
router.delete("/:id", authenticate, verifyUser,  NotesController.removeNotes);
router.put("/:id", authenticate, verifyUser,  NotesController.updateNotes);

module.exports = router;
