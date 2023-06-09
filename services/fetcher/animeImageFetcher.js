const axios = require("axios");

const config = {
  method: "GET",
  url: "https://api.jikan.moe/v4/anime",
  params: {
    q: "",
    sort: "asc",
    letter: "",
  },
};

// if no image uri found, then this will be used
const dummyAnimeURI = "https://cdn.myanimelist.net/images/anime/7/42453.jpg";

const fetchAnimeImage = async (animeName) => {
  try {
    config.params.q = animeName;
    config.params.letter = animeName;
    const response = await axios.request(config);
    if (response?.data?.data[0]?.images?.jpg?.image_url) {
      return response.data.data[0].images.jpg.image_url;
    } else return dummyAnimeURI;
  } catch (err) {
    return err;
  }
};

module.exports = fetchAnimeImage;
