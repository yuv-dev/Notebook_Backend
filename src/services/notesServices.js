const Notes = require("../models/notesModel");

const create = (queryObjectToBeAddedToDb) => {
  const newNotes = Notes.create(queryObjectToBeAddedToDb);
  return newNotes;
};

const find = (queryObjectToFind) => {
  const foundNotes = Notes.find(queryObjectToFind);
  return foundNotes;
};

const findOne = (queryObjectToFind) => {
  const foundNote = Notes.findOne(queryObjectToFind);
  return foundNote;
};

const findById = (noteId) => {
  const foundNote = Notes.findById(noteId);
  return foundNote;
};

const deleteOne = (queryObjectToFind) => {
  const deletedNote = Notes.findOneAndDelete(queryObjectToFind);
  return deletedNote;
};

const update = (filter, updateQuery) => {
  const updatedNote = Notes.findOneAndUpdate(filter, updateQuery, {
    returnOriginal: false,
  });
  return updatedNote;
};

module.exports = {
  create,
  find,
  findOne,
  findById,
  deleteOne,
  update,
};
