require("dotenv").config();
const axios = require("axios");
const fetchAnimeImage = require("./animeImageFetcher");
const fetchCharacterImage = require("./characterImageFetcher");

const config = {
  method: "GET",
  url: "https://waifu.it/api/quote",
  headers: {
    Authorization: process.env.ANIMU_API_TOKEN,
  }
};

const fetchRandomQuote = async () => {
  try {
    const response = await axios.request(config);

    // fetching anime image
    let animeImageURI = await fetchAnimeImage(response.data.anime || "");

    // fetching character image
    let characterImageURI = await fetchCharacterImage(
      response.data.author || ""
    );

    const quote = { ...response.data, characterImageURI, animeImageURI };
    delete quote["_id"]; // deleting redundant params
    return quote;
  } catch (err) {
    throw err;
  }
};

module.exports = fetchRandomQuote;
