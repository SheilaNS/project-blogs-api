require('dotenv').config();
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { unauthorized } = require('./utils');

const secret = process.env.JWT_SECRET || 'secret';

const authService = {
  bodyValidate: async (data) => {
    const schema = Joi.object({
      email: Joi.string().email().required().max(255),
      password: Joi.string().required().max(255),
    });
    try {
      const result = await schema.validateAsync(data);
      return result;
    } catch (error) {
      unauthorized('Some required fields are missing');
    }
  },

  createToken: async (user) => {
    const { id, displayName } = user;
    const payload = { data: { id, displayName } };
    const token = jwt.sign(payload, secret);
    return token;
  },

  readToken: async (token) => {
    try {
      const { data } = jwt.verify(token, secret);
      return data;
    } catch (error) {
      unauthorized('Invalid fields');
    }
  },
};

module.exports = authService;