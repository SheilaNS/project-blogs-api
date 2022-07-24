const Joi = require('joi');
const Sequelize = require('sequelize');
const models = require('../database/models');
const errors = require('./utils');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const postService = {
  bodyValidade: async (data) => {
    const schema = Joi.object({
      title: Joi.string().required().max(255),
      content: Joi.string().required().max(255),
      categoryIds: Joi.array().items(Joi.number().required().integer()),
    });
    try {
      const result = await schema.validateAsync(data);
      return result;
    } catch (error) {
      errors.validationError({ message: 'Some required fields are missing' });
    }
  },

  categoryValidade: async (ids) => {
    const all = await models.Category.findAll();
    const exists = ids.every((elem) => all.some((cat) => elem === cat.toJSON().id));
    if (!exists) errors.validationError({ message: '"categoryIds" not found' });
    return exists;
  },

  add: async (data, id) => {
    try {
      const { title, content } = data;
      const result = await sequelize.transaction(async (t) => {
        const post = await models.BlogPost.create({
          title,
          content,
          userId: id,
        },
        { transaction: t });
        data.categoryIds.forEache(async (elem) => {
          await models.PostCategory.create({ postId: post.id, categoryId: elem });
        });
      });
      return result;
    } catch (error) {
      errors.noSuccess(error.message);
    }
  },
};

module.exports = postService;