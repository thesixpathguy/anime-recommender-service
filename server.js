require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const errorHandler = require("./middleware/errorHandler.js");

const PORT = process.env.PORT || 3500;

// connecting DB
connectDB();

// Cors settings
app.use(credentials);
app.use(cors(corsOptions));

// for form data (encoded data)
app.use(express.urlencoded({ extended: false }));

// for json data
app.use(express.json());

//routes

// error handler
app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to mongoDB");
  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
});
