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

// running cron job
cronJob.start();

app.set("view engine", "pug");

// Cors settings
// app.use(credentials);
app.use(cors());

// Middleware
app.use(bodyParser.urlencoded({ extended: true })); // for form data (encoded data)
app.use(express.json()); // for json data
app.use("/", express.static(path.join(__dirname, "public")));

//routes
app.use("/", require("./routes/root.js"));
app.use("/subscribe", require("./routes/subscribe.js"));
app.use("/api/shootEmail", require("./routes/api/shootEmail"));
app.use("/api/user", require("./routes/api/user"));
app.use("/newsletter", async (req, res) => {
  const dataCompiler = require("./services/dataCompiler");
  const { quote, waifuImage, birthdays, randomAnimes } = await dataCompiler(5, "sfw");
  console.log(quote, waifuImage, birthdays, randomAnimes);
  res.render(
    path.join(__dirname, "views", "templates", "newsletter.pug"), 
    {
      title: "Anime Newsletter",
      quote: quote,
      waifu: waifuImage,
      birthdays: birthdays,
      recommendations: randomAnimes
    }
  );
})

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
