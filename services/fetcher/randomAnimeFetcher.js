const axios = require("axios");
const rateLimiter = require("../../utils/rateLimiter");

const config = {
  method: "GET",
  url: "https://api.jikan.moe/v4/random/anime",
};

const rankLimit = 3000; // will pick animes below the rank of 3000

const fetchRandomAnime = async () => {
  try {
    while (true) {
      await rateLimiter(1000);
      const response = await axios.request(config);
      let anime = {};
      // anime should be approved by MAL
      if (response?.data?.data && response.data.data.approved) {
        const res = response.data.data;
        if (res.rank > rankLimit) continue; // rank limit check
        if (res.title) anime.title = res.title;
        if (res.url) anime.url = res.url;
        if (res.synopsis) anime.synopsis = res.synopsis;
        if (res.genres) {
          const genre = res.genres.map((g) => g.name);
          anime.genre = genre;
        }
        if (res.rank) anime.rank = res.rank;
        if (typeof res.airing !== "undefined") anime.airing = res.airing;
        if (res.episodes) {
          anime.episodes = res.episodes;
        }
        if (res.images?.jpg?.image_url)
          anime.imageURI = res.images.jpg.image_url;
      }
      return anime;
    }
  } catch (err) {
    throw err;
  }
};

const fetchRandomAnimes = async (num) => {
  try {
    let animes = [];
    while (num--) {
      const anime = await fetchRandomAnime();
      if (
        animes.find((a) => {
          a === anime;
        })
      ) {
        num++;
        continue;
      } else {
        animes.push(anime);
      }
    }
    return animes;
  } catch (err) {
    throw err;
  }
};

module.exports = fetchRandomAnimes;
