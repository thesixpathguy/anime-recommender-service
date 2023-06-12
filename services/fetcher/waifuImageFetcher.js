const axios = require("axios");

const url = "https://api.waifu.pics";

const config = {
  method: "GET",
  url: url,
};

// categories provided by the api
const category = [
  "waifu",
  "neko",
  "bully",
  "cry",
  "hug",
  "smile",
  "waifu",
  "neko",
  "trap",
  "blowjob",
]; // last 4 are of type nsfw

const fetchRandomWaifu = async (type) => {
  try {
    config.url = url;
    config.url = config.url.concat("/" + type);
    if (type == "sfw") {
      config.url = config.url.concat(
        "/" + category[Math.floor(Math.random() * (category.length - 4))]
      );
    } else {
      config.url = config.url.concat(
        "/" + category[Math.floor(Math.random() * category.length)]
      );
    }
    const response = await axios.request(config);
    const imageURI = response.data;
    return imageURI;
  } catch (err) {
    throw err;
  }
};

module.exports = fetchRandomWaifu;
