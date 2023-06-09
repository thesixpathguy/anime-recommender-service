const express = require("express");
const path = require("path");
const router = express.Router();
const handleSubscription = require('../controllers/subscribeController');

router.post('/', handleSubscription)

module.exports = router;