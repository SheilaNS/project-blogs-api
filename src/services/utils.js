const notFound = (message) => {
  const err = new Error(message);
  err.name = 'NotFoundError';
  throw err;
};

const unauthorized = (message) => {
  const err = new Error(message);
  err.name = 'UnauthorizedError';
  throw err;
};

module.exports = {
  notFound,
  unauthorized,
};