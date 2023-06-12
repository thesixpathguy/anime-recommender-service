const path = require("path");
const { createNewUser, newUserEmitter } = require("./userController");
const { EVENTS } = require("../utils/utilConstants");

const handleSubscription = async (req, res, next) => {
  //TODO: Verification link to be emailed
  try {
    newUserEmitter.once(EVENTS.ERROR, (message) => {
      console.log("Event emitter fired.");
      res.render(
        path.join(__dirname, "..", "views", "templates", "subscribeResponse.pug"),
        {
          title: "Anime Recommneder",
          greetingText: "Oops!",
          message: message,
        }
      );
    });
    newUserEmitter.once(EVENTS.SUCCESS, (message) => {
      res.render(
        path.join(__dirname, "..", "views", "templates", "subscribeResponse.pug"),
        {
          title: "Anime Recommneder",
          greetingText: "Thank you!",
          message: "Email received.",
        }
      );
    });
    await createNewUser(req, res, next);
  } catch (err) {
    next(err);
  }
};

module.exports = handleSubscription;
