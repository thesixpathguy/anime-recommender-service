// Have to set this header for cors usage.
const allowedOrigins = ["http://localhost:3500", "https://www.google.com"];

const credentials = (req, res, next) => {
  const origin = req.headers["origin"];
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};

module.exports = credentials;
