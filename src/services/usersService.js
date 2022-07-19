const Joi = require('joi');
const models = require('../database/models');
const { unauthorized, validationError, userAlreadyExists } = require('./utils');

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
      validationError(error);
    }
  },

  emailValidate: async (email) => {
    const user = await models.User.findOne({
      where: { email },
      raw: true,
    });
    if (user) userAlreadyExists('User already registered');
  },

  getByEmail: async (email, password) => {
    const user = await models.User.findOne({
      where: { email, password },
      raw: true,
    });
    if (!user) unauthorized('Invalid fields');
    return user;
  },

  add: async (data) => {
    const model = await models.User.create(data);
    const newUser = model.toJSON();
    const { password, ...user } = newUser;
    return user;
  },
};

module.exports = usersService;