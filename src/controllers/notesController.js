const Noteservice = require("../services/notesServices");
const response = require("../utils/response");


/**
 * Function to be implemented in notesController.js:-
 * addNotes : Add a new note
 * getNotes : Get notes by filter
 * getNotesById : Get notes by id
 * searchNotes : Get notes by keyword
 * updateNotes :  Update a note by id
 * removeNotes :  Remove a note by id
*/


//Add a new Note
const addNotes = async (req, res) => {
  let queryObjectToBeAddedToDb = {
    title: req.body.title,
    description: req.body.description,
    tag: req.body.tag,
    username: req.body.username,
  };

  try {
    const Notes = await Noteservice.create(queryObjectToBeAddedToDb);
    return res
      .status(201)
      .send(response.sendSuccess("Notes Added Succesfully", Notes));
  } catch (err) {
    return res.status(500).send(response.sendError(err));
  }
};

//Get Notes by filter
const getNotes = async (req, res) => {
  let queryObjectToFind = {};

  const keyObject = {...req.body, ...req.query, ...req.params};

  for (let key in keyObject) {
    if (key === "username") {
      //This conditon will ensure that regex doesnt work on username and other similar users cant get differernt users data
      queryObjectToFind[key] = req.body[key];
    } else {
      queryObjectToFind[key] = { $regex: req.body[key], $options: "i" };
    }
  }

  try {
    const Notes = await Noteservice.find(queryObjectToFind);
    if (Notes.length === 0)
      return res.status(400).send(response.sendFailed("No Notes Found"));
    return res.status(200).send(response.sendSuccess("Notes Found", Notes));
  } catch (err) {
    return res.status(500).send(response.sendError(err));
  }
};

//Get Notes by filter
const getNoteById = async (req, res) => {
  let noteId = req.body.id || req.query.id || req.params.id;

  try {
    const Notes = await Noteservice.findById(noteId);
    if (Notes.length === 0)
      return res.status(400).send(response.sendFailed("No Notes Found"));
    return res.status(200).send(response.sendSuccess("Notes Found", Notes));
  } catch (err) {
    return res.status(500).send(response.sendError(err));
  }
};


//Find note by keyword
const searchNotes = async (req, res) => {
  const searchPattern =
    req.params.keyword || req.query.keyword || req.params.keyword;
  const queryObjectToFind = {
    $or: [
      { title: { $regex: searchPattern, $options: "i" } },
      { description: { $regex: searchPattern, $options: "i" } },
    ],
  };

  try {
    const Notes = await Noteservice.find(queryObjectToFind);
    if (Notes.length === 0)
      return res.status(400).send(response.sendFailed("No Notes Found"));
    return res.status(200).send(response.sendSuccess("Notes Found", Notes));
  } catch (err) {
    return res.status(500).send(response.sendError(err));
  }
};


//Remove Notes
const removeNotes = async (req, res) => {
  let reqNotesId = req.body.id || req.query.id || req.params.id;
  let queryObjectToFind = { _id: reqNotesId };

  try {
    const Note = await Noteservice.deleteOne(queryObjectToFind);
    if (!Note)
      return res.status(400).send(response.sendFailed("Notes doesn't Exist"));

    return res.status(200).send(response.sendSuccess("Note Deleted", Note));
  } catch (err) {
    return res.status(500).send(response.sendError(err));
  }
};


//Update Notes
const updateNotes = async (req, res) => {
  let reqNotesId = req.body.id || req.query.id || req.params.id;

  try {
    const Note = await Noteservice.findById(reqNotesId);
    if (!Note) {
      return res.status(400).send(response.sendFailed("Notes doesn't Exist"));
    }

    Note.title = req.body.title || Notes.title;
    Note.description = req.body.description || Notes.description;
    Note.tag = req.body.tag || Notes.tag;
    const updatedNote = await Notes.save();
    return res
      .status(200)
      .send(response.sendSuccess("Notes updated", updatedNotes));
  } catch (err) {
    return res.status(500).send(response.sendError(err));
  }
};

module.exports = {
  addNotes,
  getNotes,
  getNoteById,
  searchNotes,
  removeNotes,
  updateNotes,
};
