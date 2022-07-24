'use strict';
const { Model, DataTypes } = require('sequelize');

/** @type {import('sequelize').ModelAttributes} */
const attributes = {
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'BlogPosts',
      key: 'id',
    },
    primaryKey: true,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Categories',
      key: 'id',
    },
    primaryKey: true,
  },
};

/** @param {import('sequelize').Sequelize} sequelize */
module.exports = (sequelize) => {
  const PostCategory = sequelize.define('PostCategory', attributes, {
    timestamps: false,
    tableName: 'PostCategories'
  });
  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'Category',
      foreignKey: 'postId',
      otherKey: 'categoryId',
      through: PostCategory,
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'BlogPost',
      foreignKey: 'categoryId',
      otherKey: 'postId',
      through: PostCategory,
    });
  }
  return PostCategory;
};