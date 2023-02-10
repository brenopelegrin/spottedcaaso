const { Sequelize, Model, DataTypes } = require('sequelize');
const databaseURI = process.env.DATABASE_URI;
const sequelize = new Sequelize(databaseURI);

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



