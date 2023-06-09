const axios = require("axios");

const config = {
  method: "GET",
  url: "https://api.jikan.moe/v4/characters",
  params: {
    q: "",
    sort: "asc",
    letter: "",
  },
};

// if no image uri found, then this will be used
const dummyCharacterURI =
  "https://cdn.myanimelist.net/images/characters/5/223525.jpg";

const fetchCharacterImage = async (characterName) => {
  try {
    config.params.q = characterName;
    config.params.letter = characterName;
    const response = await axios.request(config);
    if (response?.data?.data[0]?.images?.jpg?.image_url) {
      return response.data.data[0].images.jpg.image_url;
    } else return dummyCharacterURI;
  } catch (err) {
    return err;
  }
};

module.exports = fetchCharacterImage;
