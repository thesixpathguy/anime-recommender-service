const axios = require("axios");

const config = {
  method: "GET",
  url: "https://www.animecharactersdatabase.com/api_series_characters.php",
  params: {
    month: "",
    day: "",
  },
};

const fetchBirthdays = async () => {
  try {
    const date = new Date();
    config.params.month = String(date.getMonth() + 1);
    config.params.day = date.getDate().toString();
    let response = await axios.request(config);
    birthdays = shuffleArray(response.data.characters);
    // to get maximum randomization, since Max.random() uses normal distribution
    if (birthdays.length < 3) return birthdays;
    const n = Math.floor(birthdays.length / 2);
    return [birthdays[n - 1], birthdays[n], birthdays[n + 1]];
  } catch (err) {
    throw err;
  }
};

function shuffleArray(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * arr.length);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

module.exports = fetchBirthdays;
