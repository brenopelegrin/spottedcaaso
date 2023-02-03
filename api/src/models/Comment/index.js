const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = require('../../database');

const Comment = sequelize.define('Comment', {
  id: {
    type: Sequelize.STRING,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  spotted_id: {
    type: Sequelize.UUID,
    allowNull: false
  },
  author_id: {
    type: Sequelize.UUID,
    allowNull: true
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  shares: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  text: {
    type: DataTypes.STRING,
    allowNull: true
  },
});

module.exports = Comment;