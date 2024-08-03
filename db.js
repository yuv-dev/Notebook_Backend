const mongoose = require("mongoose");
const { DB_URL } = require("./src/configs/dbConfig");
const { errorLogger } = require("./src/utils/logger");

const connectDB = async () => {
  try {
    // Bind connection to error event( to get the notification of connection errors)
    mongoose.connection.on(
      "error",
      console.error.bind(console, "MongoDB connection error:")
    );
    mongoose.connection.on("connected", () => console.log("MongoDb connected"));
    mongoose.connection.on("open", () => console.log("open"));
    mongoose.connection.on("disconnected", () => console.log("disconnected"));
    mongoose.connection.on("reconnected", () => console.log("reconnected"));
    mongoose.connection.on("disconnecting", () => console.log("disconnecting"));
    mongoose.connection.on("close", () => console.log("close"));

    await mongoose.connect(DB_URL);
  } catch (error) {
    errorLogger(error);
    console.error(error);
  }
};

module.exports = connectDB;
