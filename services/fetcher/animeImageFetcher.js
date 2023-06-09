const axios = require("axios");

const config = {
  method: "GET",
  url: "https://api.jikan.moe/v4/anime",
  params: {
    q: "",
  },
};

const fetchAnimeImage = async (animeName) => {
  try {
    config.params.q = animeName;
    const response = await axios.request(config);
    return response.data.data[0].images.jpg.image_url;
  } catch (err) {
    return err;
  }
};

fetchAnimeImage();

module.exports = fetchAnimeImage;
