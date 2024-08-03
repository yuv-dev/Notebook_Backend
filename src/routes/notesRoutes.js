const express = require("express");
const router = express.Router();

const NotesController = require("../controllers/notesController");

//Routes for login and signup
router.post("/", NotesController.addNotes);
router.get("/", NotesController.getNotes);
router.get("/search/:keyword", NotesController.searchNotes);
router.delete("/", NotesController.removeNotes);
router.put("/", NotesController.updateNotes);

module.exports = router;
