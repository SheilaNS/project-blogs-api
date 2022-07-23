const Joi = require('joi');
const models = require('../database/models');
const errors = require('./utils');

const categoryService = {
  bodyValidate: async (data) => {
    const schema = Joi.object({
      name: Joi.string().required().max(255),
    });
    try {
      const result = await schema.validateAsync(data);
      return result;
    } catch (error) {
      errors.validationError(error);
    }
  },

  add: async (data) => {
    const model = await models.Category.create(data);
    const newCategory = model.toJSON();
    return newCategory;
  },

  get: async (id) => {
    const category = await models.Category.findOne({
      where: { id },
      raw: true,
    });
    if (!category) errors.notFound('Category does not exist');
    return category;
  },
};

module.exports = categoryService;