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

const tokenNotFound = (message = 'Token not found') => {
  const err = new Error(message);
  err.name = 'TokenNotFoundError';
  throw err;
};

const invalidToken = (message = 'Expired or invalid token') => {
  const err = new Error(message);
  err.name = 'ExpiredOrInvalidTokenError';
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
  tokenNotFound,
  invalidToken,
};