const fetchBirthdays = require("./fetcher/birthdayFetcher");
const fetchRandomQuote = require("./fetcher/randomQuoteFetcher");
const fetchRandomWaifu = require("./fetcher/waifuImageFetcher");
const fetchRandomAnimes = require("./fetcher/randomAnimeFetcher");

const dataCompiler = async (num, type) => {
  try {
    const quote = await fetchRandomQuote();
    const waifuImage = await fetchRandomWaifu(type);
    const birthdays = await fetchBirthdays();
    const randomAnimes = await fetchRandomAnimes(num);
    return { quote, waifuImage, birthdays, randomAnimes };
  } catch (err) {
    throw err;
  }
};

module.exports = dataCompiler;
