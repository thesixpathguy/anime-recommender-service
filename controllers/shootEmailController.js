const asyncHandler = require("express-async-handler");

/*
    @desc shoots email with anime content
    @route GET /api/shootEmail
    @access public
*/
const shootEmail = asyncHandler(async (req, res) => {
  res.json({ esgrlm: "rsmngo" });
});

module.exports = shootEmail;
