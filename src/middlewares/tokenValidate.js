const authService = require('../services/authorizationService');

const tokenValidade = async (data) => {
  const token = await authService.tokenValidade(data);
  const user = await authService.readToken(token);
  return user.id;
};

module.exports = tokenValidade;