const sendEmail = require("../services/emailSender/emailSender");
const dataCompiler = require("../services/dataCompiler");
const { errorCodes, successCodes } = require("../utils/statusCodes");
const fetchClients = require("../services/clientsFetcher");

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
    const to = await fetchClients();
    if (to == "") {
      // no users to send emails
      res.sendStatus(successCodes.ACCEPTED);
    }
    const text = "This is the quote";
    const dataObj = await dataCompiler(5, "sfw"); // compiles html template data
    sendEmail(from, pass, to, subject, text, "");
    res.sendStatus(successCodes.ACCEPTED);
  } catch (err) {
    res.status(errorCodes.SERVER_ERROR);
    next(err);
  }
};

module.exports = shootEmail;
