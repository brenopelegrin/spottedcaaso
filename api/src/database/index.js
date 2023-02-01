const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:123@localhost:5432/spotted');

async function initializeDatabase(){
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    };
}

module.exports = sequelize;



