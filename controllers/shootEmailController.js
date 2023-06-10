const asyncHandler = require("express-async-handler");
const sendEmail = require("../services/emailSender/emailSender");

const subject = "New Anime Letter";

/*
    @desc shoots email with anime content
    @route GET /api/shootEmail
    @access public
*/
const shootEmail = asyncHandler(async (req, res) => {
  const from = process.env.EMAIL_ACCOUNT;
  const pass = process.env.EMAILL_PASSWORD;
  const to = "2019mcb1228@iitrpr.ac.in";
  const text = "This is the quote";
  sendEmail(from, pass, to, subject, text, "");
});

module.exports = shootEmail;
