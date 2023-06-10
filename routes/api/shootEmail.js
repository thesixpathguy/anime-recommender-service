const express = require("express");
const router = express.Router();
const shootEmail = require("../../controllers/shootEmailController");

router.get("/", shootEmail);

module.exports = router;
