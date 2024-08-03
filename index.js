require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { reqLogger } = require("./src/utils/logger");
//important resources
const PORT = process.env.PORT || 8000;
const MODE = process.env.NODE_ENV || "Development";
const HOSTNAME = process.env.HOSTNAME || "localhost";

const AuthRoutes = require("./src/routes/authRoutes");
const notesRoutes = require("./src/routes/notesRoutes");

const connectDB = require("./db");

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(reqLogger);

// connectToMongoDb
connectDB();

//Check server status
app.get("/", (req, res) => {
  console.log("App Connected");
  res.write("Note Book app\n");
  res.write("An app to take notes and share and retrieve them at any point of time\n");
  res.write("App complete");
  res.end();
});

app.use("/auth", AuthRoutes);
app.use("/notes", notesRoutes);

//Start the server
app.listen(PORT, () => {
  console.log(`Server running in ${MODE} mode at http://${HOSTNAME}:${PORT}/`);
});
