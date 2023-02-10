const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = require('../../database');

const Spotted = sequelize.define('Spotted', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
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
  comments: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  text: {
    type: DataTypes.STRING,
    allowNull: true
  },
  image: {
    type: DataTypes.BLOB,
    allowNull: true
  }
});

module.exports = Spotted;