// import the Sequelize constructor from the library
const Sequelize = require('sequelize');

require('dotenv').config();

// create connection to our database, pass in your MySQL information for the username and password
const sequelize = new Sequelize (
  'animals_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});





module.exports = sequelize;