require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const errorHandler = require("./middleware/errorHandler.js");

const PORT = process.env.PORT || 3500;
const env = process.env.NODE_ENV || "dev";

// connecting DB
if (env !== "dev")
    connectDB();

// Cors settings
app.use(credentials);
app.use(cors(corsOptions));

// Middleware
app.use(express.urlencoded({ extended: false })); // for form data (encoded data)
app.use(express.json()); // for json data
app.use('/', express.static(path.join(__dirname, 'public')))

//routes
app.use("/", require('./routes/root.js'));

// error handler
app.use(errorHandler);

if (env !== 'dev'){
    mongoose.connection.once("open", () => {
      console.log("Connected to mongoDB");
      app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    });
}
else {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
}