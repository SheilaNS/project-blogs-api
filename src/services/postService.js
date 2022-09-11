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

  // aplicação de bulkCreate com a ajuda do Leonardo Araujo e Imar Mendes
  add: async (data, id) => {
    const t = await sequelize.transaction();
    try {
      const { title, content, categoryIds } = data;
      const post = await models.BlogPost.create({ title, content, userId: id },
      { transaction: t });
      const array = categoryIds.map((elem) => ({ postId: post.dataValues.id, categoryId: elem }));
      await models.PostCategory.bulkCreate(array, { transaction: t });
      await t.commit();
      return post;
    } catch (error) {
      await t.rollback();
      errors.noSuccess(error.message);
    }
  },

  list: async () => {
    const post = await models.BlogPost.findAll({
      include: {
        model: models.User,
        as: 'User',
        attributes: { exclude: ['password'] },
      },
    });
    return post;
  },
};

module.exports = postService;