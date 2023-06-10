const { default: axios } = require("axios");

const fetchClients = async () => {
  try {
    res = await axios.get("http://localhost:3500/api/user");
    if (res.data.status === "success") {
      const emails = res.data.data.users.map((user) => user.email);
      return emails.join(",");
    } else throw new Error("user api not working");
  } catch (err) {
    throw err;
  }
};

module.exports = fetchClients;
