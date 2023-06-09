const axios = require("axios");
const fetchAnimeImage = require("./animeImageFetcher");
const fetchCharacterImage = require("./characterImageFetcher");

const config = {
  method: "GET",
  url: "http://animechan.melosh.space/random",
};

const fetchRandomQuote = async () => {
  try {
    const response = await axios.request(config);

    // fetching anime image
    let animeImageURI = await fetchAnimeImage(response.data.anime || "");
    console.log(typeof animeImageURI !== "undefined");

    // fetching character image
    let characterImageURI = await fetchCharacterImage(
      response.data.character || ""
    );

    const quote = { ...response.data, animeImageURI, characterImageURI };
    delete quote["key"]; // deleting redundant params
    delete quote["__v"]; // deleting redundant params
    return quote;
  } catch (err) {
    return err;
  }
};

fetchRandomQuote();

module.exports = fetchRandomQuote;
