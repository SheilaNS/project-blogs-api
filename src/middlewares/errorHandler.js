const errors = {
  UnauthorizedError: 400,
  ValidationError: 400,
  NotFoundError: 404,
  UserAlreadyExists: 409,
  TokenNotFoundError: 401,
  ExpiredOrInvalidTokenError: 401,
  SequelizeDatabaseError: 500,
};

const errorHandler = ({ name, message }, _req, res, _next) => {
  const status = errors[name];
  if (!status) return res.sendStatus(500);
  res.status(status).json({ message });
};

module.exports = errorHandler;