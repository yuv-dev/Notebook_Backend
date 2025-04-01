const User = require("../models/userModel");

const create = (queryObjectToBeAddedToDb) => {
  const newUser = User.create(queryObjectToBeAddedToDb);
  return newUser;
};

const find = (queryObjectToFind) => {
  const foundUsers = User.find(queryObjectToFind);
  return foundUsers;
};

const findOne = (queryObjectToFind) => {
  const foundUser = User.findOne(queryObjectToFind);
  return foundUser;
};

const findByEmailorUsername = ({ email, username }) => {
  const queryObjectToFind = { $or: [{ email }, { username }] };
  const foundUser = User.findOne(queryObjectToFind);
  return foundUser;
};

const findById = (userId) => {
  const foundUser = User.findById(userId);
  return foundUser;
};

const deleteOne = (queryObjectToFind) => {
  const deletedUser = User.findOneAndDelete(queryObjectToFind);
  return deletedUser;
};

const update = (filter, updateQuery) => {
  const updatedUser = User.findOneAndUpdate(filter, updateQuery, {
    returnOriginal: false,
  });
  return updatedUser;
};

module.exports = {
  create,
  find,
  findOne,
  findById,
  deleteOne,
  update,
  findByEmailorUsername,
};
