const axios = require("axios");
const fetchAnimeImage = require("./animeImageFetcher");

const config = {
  method: "GET",
  url: "http://animechan.melosh.space/random",
};

const fetchRandomQuote = async () => {
  try {
    const response = await axios.request(config);
    // console.log(response.data);
    const imageURI = await fetchAnimeImage(response.data.anime || "");
    const quote = { ...response.data, imageURI };
    delete quote["key"]; // deleting redundant params
    delete quote["__v"]; // deleting redundant params
    return quote;
  } catch (err) {
    return err;
  }
};

fetchRandomQuote();

module.exports = fetchRandomQuote;
