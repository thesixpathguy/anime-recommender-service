const CronJob = require("cron").CronJob;
const axios = require("axios");
const { logEvents } = require("../../middleware/logEvents");

const cron = "15 9 * * *"; // every day at 9:15 AM

var cronJob = new CronJob(
  cron,
  async () => {
    console.log("Event initiated");
    await logEvents("Cron initiated.", "cronLog.txt");
    await axios.get("http://localhost:3500/api/shootEmail");
  },
  null,
  false,
  "Asia/Kolkata"
);

module.exports = cronJob;
