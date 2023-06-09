import dotenv from "dotenv"
dotenv.config()
import express from "express"
const app = express()
import cors from "cors"
import mongoose from "mongoose"
import corsOptions from "./config/corsOptions.js"
import credentials from "./middleware/credentials.js"
// import connectDB from "./config/dbConn.js"
import errorHandler from "./middleware/errorHandler.js"
import logger from "./middleware/logEvents.js"

const PORT = process.env.PORT || 3500;

// connecting DB
// connectDB();

// custom middleware logger
app.use(logger);

// Cors settings
app.use(credentials);
app.use(cors(corsOptions));

// Middleware
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
