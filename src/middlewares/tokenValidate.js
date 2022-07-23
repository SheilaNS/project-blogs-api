const authService = require('../services/authorizationService');

const tokenValidade = async (data) => {
  const token = await authService.tokenValidade(data);
  await authService.readToken(token);
};

module.exports = tokenValidade;