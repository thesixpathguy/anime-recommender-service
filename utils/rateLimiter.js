const rateLimiter = (t) => {
  return new Promise((resolve) => setTimeout(resolve, t));
};

module.exports = rateLimiter;
