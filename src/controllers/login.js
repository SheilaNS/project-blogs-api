const authService = require('../services/authorizationService');
const usersService = require('../services/usersService');

const loginController = {
  /** @type {import('express').RequestHandler} */
  login: async (req, res) => {
    const { email, password } = await authService.bodyValidate(req.body);
    const user = await usersService.getByEmail(email, password);
    const token = await authService.createToken(user);
    res.status(200).json({ token });
  },
};

module.exports = loginController;