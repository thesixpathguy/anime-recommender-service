const nodemailer = require("nodemailer");
const { logEvents } = require("../../middleware/logEvents");

const sendEmail = async (from, pass, to, subject, text, html) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: from,
        pass: pass,
      },
    });
    let info = await transporter.sendMail({
      from: "test@test.com",
      to: to,
      subject: subject,
      text: text,
      html: html,
    });
    console.log("Message sent: %s", info.messageId);
    logEvents(`${info.messageId}\t${info.accepted}`, "emailLog.txt");
  } catch (err) {
    return err;
  }
};

module.exports = sendEmail;
