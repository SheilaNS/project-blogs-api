const models = require('../database/models');
const { unauthorized } = require('./utils');

const usersService = {
  getByEmail: async (email, password) => {
    const user = await models.User.findOne({
      where: { email, password },
      raw: true,
    });
    if (!user) unauthorized('Invalid fields');
    return user;
  },
};

module.exports = usersService;