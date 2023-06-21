const sendEmail = require("../services/emailSender/emailSender");
const dataCompiler = require("../services/dataCompiler");
const { errorCodes, successCodes } = require("../utils/statusCodes");
const fetchClients = require("../services/clientsFetcher");
const rateLimiter = require("../utils/rateLimiter");
const pug = require("pug");
const path = require("path");

const subject = "New Anime Letter";

/*
    @desc shoots email with anime content
    @route GET /api/shootEmail
    @access public
*/
const shootEmail = async (req, res, next) => {
  try {
    const from = process.env.EMAIL_ACCOUNT;
    const pass = process.env.EMAILL_PASSWORD;
    const toSFW = await fetchClients(false); // fetch the subscribed sfw clients
    const toNSFW = await fetchClients(true); // fetch the subscribed nsfw clients
    const text = "";
    // const compiledTemplate = pug.compileFile(path.join(__dirname, "..", "views", "templates", "newsletter.pug"));
    if (toSFW !== "") {
      const { quote, waifuImage, birthdays, randomAnimes } = await dataCompiler(5, "sfw");  // compiles html template data
      // const html = compiledTemplate({
      //   title: "Anime Newsletter",
      //   quote: quote,
      //   waifu: waifuImage,
      //   birthdays: birthdays,
      //   recommendations: randomAnimes
      // });
      const html = pug.renderFile(path.join(__dirname, "..", "views", "templates", "newsletter.pug"),
      {
        title: "Anime Newsletter",
        quote: quote,
        waifu: waifuImage,
        birthdays: birthdays,
        recommendations: randomAnimes
      });
      await sendEmail(from, pass, toSFW, subject, text, html);
    }
    rateLimiter(10000);
    if (toNSFW !== "") {
      const { quote, waifuImage, birthdays, randomAnimes } = await dataCompiler(5, "nsfw"); // compiles html template data
      const html = pug.renderFile(path.join(__dirname, "..", "views", "templates", "newsletter.pug"),
      {
        title: "Anime Newsletter",
        quote: quote,
        waifu: waifuImage,
        birthdays: birthdays,
        recommendations: randomAnimes
      });
      await sendEmail(from, pass, toNSFW, subject, text, html);
    }
    res.sendStatus(successCodes.ACCEPTED);
  } catch (err) {
    res.status(errorCodes.SERVER_ERROR);
    next(err);
  }
};

module.exports = shootEmail;
