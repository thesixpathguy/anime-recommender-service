import errorCodes from "../constants/errorCodes.js";
import logEvents from "./logEvents.js";

const errorHandler = function (err, req, res, next) {
  let reason = "";
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case errorCodes.VALIDATION_ERROR:
      reason = "Validation failed";
      break;
    case errorCodes.NOT_FOUND:
      reason = "Not found";
      break;
    case errorCodes.FORBIDDEN:
      reason = "Forbidden";
      break;
    case errorCodes.UNAUTHORIZED:
      reason = "Unauthorized";
      break;
    case errorCodes.SERVER_ERROR:
      reason = "Server error";
      break;
    default:
      console.log("no error. all is good.");
      break;
  }
  logError(reason, statusCode, err.stack);
  res.json({
    title: reason,
    statusCode: statusCode,
    message: err.message,
    stack: err.stack,
  });
};

const logError = (reason, statusCode, errorStack) => {
  logEvents(`${reason}: ${statusCode}`, "errLog.txt");
  console.error(errorStack);
};

export default errorHandler;
