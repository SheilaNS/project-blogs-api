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
};

module.exports = userController;