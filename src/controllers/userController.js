const authService = require('../services/authorizationService');
const usersService = require('../services/usersService');

const userController = {
  add: async (req, res) => {
    const data = await usersService.bodyValidate(req.body);
    await usersService.emailValidate(data.email);
    await usersService.add(data);
    const token = await authService.createToken(data);
    res.status(201).json({ token });
  },

  getAll: async (req, res) => {
    const token = await authService.tokenValidade(req.headers.authorization);
    await authService.readToken(token);
    const users = await usersService.getAll();
    res.status(200).json(users);
  },

  get: async (req, res) => {
    const { id } = req.params;
    const token = await authService.tokenValidade(req.headers.authorization);
    await authService.readToken(token);
    const user = await usersService.get(id);
    res.status(200).json(user);
  },
};

module.exports = userController;