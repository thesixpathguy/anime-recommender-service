const express = require("express");
const userController = require("../../controllers/userController");

const router = express.Router();
router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createNewUser)
    .put(userController.updateUserNSFWPreference)
    .delete(userController.deleteUser);

router.route('/:email').get(userController.getUserByEmail);

module.exports = router;