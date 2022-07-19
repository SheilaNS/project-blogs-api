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

const userAlreadyExists = (message) => {
  const err = new Error(message);
  err.name = 'UserAlreadyExists';
  throw err;
};

const validationError = (err) => {
  const error = err;
  error.name = 'ValidationError';
  throw err;
};

module.exports = {
  notFound,
  unauthorized,
  validationError,
  userAlreadyExists,
};