const Noteservice = require("../services/notesServices");
const response = require("../utils/response");
const { userType } = require("../utils/constants");

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
    user: req.userId,
    username: req.username,
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

/**
 * Get All Notes by all users
 * Strictly for Admin ONLY
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getAllNotes = async (req, res) => {
  let queryObjectToFind = {};

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
const getNotes = async (req, res) => {
  let queryObjectToFind = { user: req.userId, username: req.username };

  const keyObject = { ...req.body, ...req.query, ...req.params };

  console.log(keyObject);
  for (let key in keyObject) {
    if (key === "user" || key === "username") {
      //This conditon will ensure that regex doesnt work on username and other users cant get differernt users data
      if (req.userType === userType.admin)
        queryObjectToFind[key] = req.body[key];
    } else {
      queryObjectToFind[key] = { $regex: req.body[key], $options: "i" };
    }
  }
  console.log(queryObjectToFind);
  try {
    const Notes = await Noteservice.find(queryObjectToFind);
    if (Notes.length === 0)
      return res.status(400).send(response.sendFailed("No Notes Found"));
    return res.status(200).send(response.sendSuccess("Notes Found", Notes));
  } catch (err) {
    return res.status(500).send(response.sendError(err));
  }
};

//Get Notes by tags
const getNotesByTag = async (req, res) => {
  let queryObjectToFind = { user: req.userId, tag: req.params.tag };

  try {
    const Notes = await Noteservice.find(queryObjectToFind);
    if (Notes.length === 0)
      return res.status(400).send(response.sendFailed("No Notes Found"));
    return res.status(200).send(response.sendSuccess("Notes Found", Notes));
  } catch (err) {
    return res.status(500).send(response.sendError(err));
  }
};

/**
 * Get Notes by id
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getNoteById = async (req, res) => {
  let noteId = req.body.id || req.query.id || req.params.id;
  
  ///Here there is a issue .ANy user can access the data if he has he id of the note
  try {
    const Note = await Noteservice.findById(noteId);
    if (Note === null)
      return res.status(400).send(response.sendFailed("No Note Found"));
       
    if (Note.user.toString() !== req.userId && req.userType !== userType.admin) {
      return res.status(401).send(response.sendFailed("Unauthorized Access"));
    }
    return res.status(200).send(response.sendSuccess("Note Found", Note));
  } catch (err) {
    return res.status(500).send(response.sendError(err));
  }
};

/**
 * Find note by keyword
 *
 */
const searchNotes = async (req, res) => {
  const searchPattern = req.params.keyword || req.query.keyword;
  const queryObjectToFind = {
    $and: [
      {
        $or: [
          { title: { $regex: searchPattern, $options: "i" } },
          { description: { $regex: searchPattern, $options: "i" } },
        ],
      },
      { user: req.userId },
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



/**
 * Remove Notes
 * @param {*} req
 * @param {*} res
 * @returns
 */
const removeNotes = async (req, res) => {
  const reqNotesId = req.body.id || req.query.id || req.params.id;
  const queryObjectToFind = { _id: reqNotesId };
  //To make that only the user other than ADMIN who created the note can delete it
  if(req.userType !== userType.admin){
    queryObjectToFind.user = req.userId;
  }

  //Here the issue is that any user can delete the note if he has the id of the note
  try {
    const Note = await Noteservice.findById(reqNotesId);
    if (Note === null)
      return res.status(400).send(response.sendFailed("Notes doesn't Exist"));

    console.log("Note",Note)  
    if (Note.user.toString() !== req.userId && req.userType !== userType.admin) {
      return res.status(401).send(response.sendFailed("Unauthorized Access"));
    }
    const deletedNote = await Noteservice.deleteOne(queryObjectToFind);
    console.log(deletedNote)
    
   
    return res.status(200).send(response.sendSuccess("Note Deleted", deletedNote));
  } catch (err) {
    return res.status(500).send(response.sendError(err));
  }
};

/**
 * Update Notes
 * @param {*} req
 * @param {*} res
 * @returns
 */
const updateNotes = async (req, res) => {
  let reqNotesId = req.body.id || req.query.id || req.params.id;

  try {
    const Note = await Noteservice.findById(reqNotesId);
    if (!Note) {
      return res.status(400).send(response.sendFailed("Notes doesn't Exist"));
    }
    
    if (Note.user.toString() !== req.userId && req.userType !== userType.admin) {
      return res.status(401).send(response.sendFailed("Unauthorized Access"));
    }

    Note.title = req.body.title || Note.title;
    Note.description = req.body.description || Note.description;
    Note.tag = req.body.tag || Note.tag;
    const updatedNote = await Note.save();
    return res
      .status(200)
      .send(response.sendSuccess("Notes updated", updatedNote));
  } catch (err) {
    return res.status(500).send(response.sendError(err));
  }
};

module.exports = {
  addNotes,
  getAllNotes,
  getNotes,
  getNoteById,
  getNotesByTag,
  searchNotes,
  removeNotes,
  updateNotes,
};
