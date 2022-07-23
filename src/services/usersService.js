const Joi = require('joi');
const models = require('../database/models');
const errors = require('./utils');

const usersService = {
  bodyValidate: async (data) => {
    const schema = Joi.object({
      displayName: Joi.string().required().min(8).max(255),
      email: Joi.string().email().required().max(255),
      password: Joi.string().required().min(6).max(255),
      image: Joi.string().empty(''),
    });
    try {
      const result = await schema.validateAsync(data);
      return result;
    } catch (error) {
      errors.validationError(error);
    }
  },

  emailValidate: async (email) => {
    const user = await models.User.findOne({
      where: { email },
      raw: true,
    });
    if (user) errors.userAlreadyExists('User already registered');
  },

  getByEmail: async (email, password) => {
    const user = await models.User.findOne({
      where: { email, password },
      raw: true,
    });
    if (!user) errors.unauthorized('Invalid fields');
    return user;
  },

  add: async (data) => {
    const model = await models.User.create(data);
    const newUser = model.toJSON();
    const { password, ...user } = newUser;
    return user;
  },

  getAll: async () => {
    const users = await models.User.findAll({
      attributes: { exclude: ['password'] },
    });
    return users;
  },
};

module.exports = usersService;