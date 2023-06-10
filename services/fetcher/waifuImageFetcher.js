const axios = require("axios");

const config = {
  method: "GET",
  url: "https://api.waifu.pics",
};

// categories provided by the api
const category = [
  "waifu",
  "neko",
  "shinobu",
  "megumin",
  "bully",
  "cuddle",
  "cry",
  "hug",
  "awoo",
  "kiss",
  "lick",
  "pat",
  "bonk",
  "blush",
  "smile",
  "wave",
  "highfive",
  "handhold",
  "bite",
  "slap",
  "kill",
  "happy",
  "wink",
  "dance",
  "waifu",
  "neko",
  "trap",
  "blowjob",
]; // last 4 are of type nsfw

const fetchRandomWaifu = async (type) => {
  try {
    config.url += "/" + type;
    if (type == "sfw") {
      config.url +=
        "/" + category[Math.floor(Math.random() * category.length - 4)];
    } else {
      config.url += "/" + category[Math.floor(Math.random() * category.length)];
    }

    const response = await axios.request(config);
    const imageURI = response.data;
    console.log(imageURI);
    return imageURI;
  } catch (err) {
    return err;
  }
};

module.exports = fetchRandomWaifu;
