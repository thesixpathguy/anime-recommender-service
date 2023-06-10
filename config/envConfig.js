require("dotenv").config();
// Container for environments
var environments = {};

/*
TODO:
1. Create separate test and prod DB.
*/

// Dev environment
environments.dev = {
  httpPORT: process.env.DEV_PORT,
  envName: "dev",
};

// Prod environment
environments.prod = {
  httpPORT: process.env.PROD_PORT,
  envName: "prod",
};

var currEnvironment =
  typeof process.env.NODE_ENV == "string" ? process.env.NODE_ENV : "";

// Export the environment
var environmentToExport =
  typeof environments[currEnvironment] == "object"
    ? environments[currEnvironment]
    : environments.dev;

// Export environments module
module.exports = environmentToExport;
