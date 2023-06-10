const fs = require("fs");
const path = require("path");
const { errorCodes } = require("../utils/statusCodes");
const pug = require("pug");

const handleSubscription = (req, res, next) => {
  //TODO: Verification link to be emailed
  try {
    const email = req.body.email;
    if (!email) {
      res.render(
        path.join(
          __dirname,
          "..",
          "views",
          "templates",
          "subscribeResponse.pug"
        ),
        {
          title: "Anime Recommneder",
          greetingText: "Oops!",
          message: "Email is required.",
        }
      );
      return;
    }
    res.render(
      path.join(__dirname, "..", "views", "templates", "subscribeResponse.pug"),
      {
        title: "Anime Recommneder",
        greetingText: "Thank you!",
        message: "Email received.",
      }
    );
  } catch (err) {
    res.status(errorCodes.SERVER_ERROR);
    next(err);
  }
};

module.exports = handleSubscription;
