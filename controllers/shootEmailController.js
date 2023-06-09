const asyncHandler = require("express-async-handler");

const shootEmail = asyncHandler(async (req, res) => {
  res.json({ esgrlm: "rsmngo" });
});

module.exports = shootEmail;
