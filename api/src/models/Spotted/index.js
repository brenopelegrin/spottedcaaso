const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = require('../../database');

const Spotted = sequelize.define('Spotted', {
  id: {
    type: DataTypes.UUIDV4,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  issuer_public_id: {
    type: DataTypes.STRING,
    allowNull: false
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
});

module.exports = Spotted;