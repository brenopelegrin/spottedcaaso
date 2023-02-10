const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = require('../../database')
const bcrypt = require('bcryptjs')

const User = sequelize.define('User', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    profile_picture: {
      type: DataTypes.BLOB,
      allowNull: true
    },
},
{
  hooks: {
    beforeCreate: async (user, options) => {
      const hash = await bcrypt.hash(user.password, 10);
      user.password = hash;
    }
  },
  defaultScope: {
    attributes: {
      exclude: ['id', 'password']
    }
  },
  scopes: {
    showLoginData: {
      attributes: { 
        exclude: ['username', 'verified', 'profile_picture', 'createdAt', 'updatedAt'] 
      },
    }
  }
});

module.exports = User;