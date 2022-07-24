'use strict';
const { Model, DataTypes } = require('sequelize');

/** @type {import('sequelize').ModelAttributes} */
const attributes = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    }
  },
  published: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updated: {
    type: DataTypes.DATE,
    allowNull: false,
  },
};

/** @param {import('sequelize').Sequelize} sequelize */
module.exports = (sequelize) => {
  const BlogPost = sequelize.define('BlogPost', attributes, {
    tableName: 'BlogPosts'
  });
  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      foreignKey: 'id',
      as: 'User'
    })
  }
  return BlogPost;
};