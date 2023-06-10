const fs = require('fs');
const path = require('path');
const { errorCodes } = require("../constants/statusCodes");
const pug = require('pug');

const handleSubscription = (req, res) => {
  //TODO: Verification link to be emailed
  const email = req.body.email;
  if (!email) {
    res.render(
      path.join(__dirname, '..', 'views', 'templates', 'subscribeResponse.pug'),
      {
        title: 'Anime Recommneder',
        greetingText: 'Oops!',
        message: 'Email is required.', 
      }
    )
    return;
  }
  //save the email to the DB
  
  res.render(
    path.join(__dirname, '..', 'views', 'templates', 'subscribeResponse.pug'),
    {
      title: 'Anime Recommneder',
      greetingText: 'Thank you!',
      message: 'Email received.',
    }
  )
}

module.exports = handleSubscription;