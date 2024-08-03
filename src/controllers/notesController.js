const Noteservice = require("../services/notesServices");
const response = require("../utils/response");

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

const getNotes = async (req, res) => {
  let queryObjectToFind = {};

  for (let key in req.body) {
    if (key === "username") {
      //This conditon will ensure that regex doesnt work on username and other users cant get differernt users data
      queryObjectToFind[key] = req.body[key];
    } else {
      queryObjectToFind[key] = { $regex: req.body[key], $options: "i" };
    }
  }

  for (let key in req.query) {
    queryObjectToFind[key] = { $regex: req.query[key], $options: "i" };
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

//Find note by keyword
const searchNotes = async (req, res) => {
  const searchPattern = req.params.keyword || req.query.keyword;
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

const removeNotes = async (req, res) => {
  let reqNotesId = req.body.id || req.query.id || req.params.id;
  let queryObjectToFind = { _id: reqNotesId };

  try {
    const Notes = await Noteservice.deleteById(queryObjectToFind);
    if (!Notes)
      return res.status(400).send(response.sendFailed("Notes doesn't Exist"));

    return res.status(200).send(response.sendSuccess("Note Deleted", Notes));
  } catch (err) {
    return res.status(500).send(response.sendError(err));
  }
};

//Update Notes
const updateNotes = async (req, res) => {
  let reqNotesId = req.body.id || req.query.id || req.params.id;
  let queryObjectToFind = { _id: reqNotesId };

  try {
    const Notes = await Noteservice.findById(queryObjectToFind);
    if (!Notes) {
      return res.status(400).send(response.sendFailed("Notes doesn't Exist"));
    }

    Notes.title = req.body.title || Notes.title;
    Notes.description = req.body.description || Notes.description;
    Notes.tag = req.body.tag || Notes.tag;
    const updatedNotes = await Notes.save();
    return res
      .status(200)
      .send(response.sendSuccess("Notes details updated", updatedNotes));
  } catch (err) {
    return res.status(500).send(response.sendError(err));
  }
};

module.exports = {
  addNotes,
  getNotes,
  searchNotes,
  removeNotes,
  updateNotes,
};
