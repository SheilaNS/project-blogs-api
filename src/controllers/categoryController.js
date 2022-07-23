const tokenValidade = require('../middlewares/tokenValidate');
const categoryService = require('../services/categoryService');

const categoryController = {
  add: async (req, res) => {
    await tokenValidade(req.headers.authorization);
    const data = await categoryService.bodyValidate(req.body);
    const newCat = await categoryService.add(data);
    res.status(201).json(newCat);
  },

  getAll: async (req, res) => {
    await tokenValidade(req.headers.authorization);
    const categories = await categoryService.getAll();
    res.status(200).json(categories);
  },
};

module.exports = categoryController;