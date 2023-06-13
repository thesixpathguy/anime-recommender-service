const { default: axios } = require("axios");

const fetchClients = async (NSFWPreference) => {
  try {
    res = await axios.get("http://localhost:3500/api/user");
    if (res.data.status === "success") {
      const emails = res.data.data.users
        .filter((user) => user.NSFWPreference === NSFWPreference)
        .map((user) => user.email);
      return emails.join(",");
    } else throw new Error("user api not working");
  } catch (err) {
    throw err;
  }
};

module.exports = fetchClients;
