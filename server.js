require("dotenv").config();
const express = require("express");
const app = express();
const envConfig = require("./config/envConfig");
const cors = require("cors");
const path = require("path");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const connectDB = require("./config/dbConn");
const errorHandler = require("./middleware/errorHandler");
const cronJob = require("./services/cronScheduler/cronScheduler");

const PORT = envConfig.httpPORT || 3500;

// running cron job
cronJob.start();

// connecting DB
console.log(envConfig.envName);
if (envConfig.envName !== "dev") connectDB();

app.set("view engine", "pug");

// Cors settings
app.use(credentials);
app.use(cors(corsOptions));

// Middleware
app.use(bodyParser.urlencoded({ extended: true })); // for form data (encoded data)
app.use(express.json()); // for json data
app.use("/", express.static(path.join(__dirname, "public")));

//routes
app.use("/", require("./routes/root.js"));
app.use("/subscribe", require("./routes/subscribe.js"));
app.use("/api/shootEmail", require("./routes/api/shootEmail"));

// error handler
app.use(errorHandler);

if (envConfig.envName !== "dev") {
  mongoose.connection.once("open", () => {
    console.log("Connected to mongoDB");
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  });
} else {
  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
}
