const express = require("express");
const router = express.Router();

const NotesController = require("../controllers/notesController");

//Routes for note CRUD operations
router.post("/", NotesController.addNotes);
router.get("/", NotesController.getNotes);
router.get("/:id", NotesController.getNoteById);
router.get("/search/:keyword", NotesController.searchNotes);
router.delete("/:id", NotesController.removeNotes);
router.put("/:id", NotesController.updateNotes);

module.exports = router;
