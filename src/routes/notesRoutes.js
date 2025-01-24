const express = require("express");
const router = express.Router();

const NotesController = require("../controllers/notesController");
const { authenticate   } = require("../middlewares/authentication");
const { verifyUser, isAdmin } = require("../middlewares/authorization");

//Routes for note CRUD operations  
router.post("/", authenticate, NotesController.addNotes);
router.get("/all/", authenticate, isAdmin,  NotesController.getAllNotes);
router.get("/", authenticate,  NotesController.getNotes);
router.get("/:id", authenticate,  NotesController.getNoteById);
router.get("/tags/:tag", authenticate,  NotesController.getNotesByTag);
router.get("/search/:keyword", authenticate,  NotesController.searchNotes);
router.delete("/:id", authenticate,  NotesController.removeNotes);
router.put("/:id", authenticate,   NotesController.updateNotes);

module.exports = router;
