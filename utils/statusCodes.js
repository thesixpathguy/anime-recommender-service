const errorCodes = Object.freeze({
  VALIDATION_ERROR: 400,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  SERVER_ERROR: 500,
  CONFLICT: 409,
});

const successCodes = Object.freeze({
  OK: 200,          // Successful request
  CREATED: 201,     // New resource created
  ACCEPTED: 202,    // Accepted for processing, but processing not complete
  NO_CONTENT: 204,  // No content to send, but headers are useful
});

module.exports = { errorCodes, successCodes };