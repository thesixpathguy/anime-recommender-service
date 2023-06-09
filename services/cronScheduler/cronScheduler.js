const CronJob = require("cron").CronJob;
const axios = require("axios");
const { logEvents } = require("../../middleware/logEvents");

const cron = "* * * * * *"; // every day at 10:15 AM

var cronJob = new CronJob(
  cron,
  async () => {
    console.log("Event initiated");
    logEvents("Cron initiated.", "cronLog.txt");
    await axios.get("http://localhost:3500/api/shootEmail");
  },
  null,
  false,
  "Asia/Kolkata"
);

module.exports = cronJob;
