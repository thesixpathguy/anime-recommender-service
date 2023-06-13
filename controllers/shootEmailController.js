const sendEmail = require("../services/emailSender/emailSender");
const dataCompiler = require("../services/dataCompiler");
const { errorCodes, successCodes } = require("../utils/statusCodes");
const fetchClients = require("../services/clientsFetcher");
const rateLimiter = require("../utils/rateLimiter");

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
    const text = "This is the quote";
    if (toSFW !== "") {
      const dataObjSFW = await dataCompiler(5, "sfw"); // compiles html template data
      await sendEmail(from, pass, toSFW, subject, text, "");
    }
    rateLimiter(10000);
    if (toNSFW !== "") {
      const dataObjNSFW = await dataCompiler(5, "nsfw"); // compiles html template data
      await sendEmail(from, pass, toNSFW, subject, text, "");
    }
    res.sendStatus(successCodes.ACCEPTED);
  } catch (err) {
    res.status(errorCodes.SERVER_ERROR);
    next(err);
  }
};

module.exports = shootEmail;
