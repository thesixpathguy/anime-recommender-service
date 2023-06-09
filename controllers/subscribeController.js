const fs = require('fs');
const path = require('path');
const errorCodes = require("../constants/errorCodes");

const handleSubscription = (req, res) => {
  console.log(req.body)
  const email = req.body.email;
  if (!email) {
    res.status(400).json({ message: "Email is required" });
    return;
  }
  console.log(email);
  res.status(200).json({ message: "Email received" });
}

module.exports = handleSubscription;