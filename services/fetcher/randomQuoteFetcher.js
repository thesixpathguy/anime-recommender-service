const axios = require("axios");

const config = {
  method: "GET",
  url: "http://animechan.melosh.space/random",
};

const fetchRandomQuote = async () => {
  try {
    const response = await axios.request(config);
    console.log(response.data);
  } catch (err) {
    return err;
  }
};

module.exports = fetchRandomQuote;
