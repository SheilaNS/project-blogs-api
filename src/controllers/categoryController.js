const authService = require('../services/authorizationService');
const categoryService = require('../services/categoryService');

const categoryController = {
  add: async (req, res) => {
    const token = await authService.tokenValidade(req.headers.authorization);
    await authService.readToken(token);
    const data = await categoryService.bodyValidate(req.body);
    const newCat = await categoryService.add(data);
    res.status(201).json(newCat);
  },
};

module.exports = categoryController;