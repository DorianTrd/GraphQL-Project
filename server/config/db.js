const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('news_db', 'root', '', {
    host: 'localhost',  
    dialect: 'mysql',   
});

module.exports = sequelize;
