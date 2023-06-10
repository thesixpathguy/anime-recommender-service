const sendEmail = require("../services/emailSender/emailSender");
const dataCompiler = require("../services/dataCompiler");

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
    const to = "2019mcb1228@iitrpr.ac.in";
    const text = "This is the quote";
    const dataObj = await dataCompiler(5, "sfw"); // compiles html template data
    sendEmail(from, pass, to, subject, text, "");
  } catch (err) {
    res.status(500);
    next(err);
  }
};

module.exports = shootEmail;
