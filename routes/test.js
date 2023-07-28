const express = require('express');
const testController = require('../controllers/testController');

const router = express.Router();
router.route('/birthday').get(testController.getBirthdays)
router.route('/quote').get(testController.getQuote)
router.route('/waifu').get(testController.getWaifu)
router.route('/animes').get(testController.getAnimes)

module.exports = router;