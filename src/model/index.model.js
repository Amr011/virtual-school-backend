const developmentConfig = require('../config/db.config.js');
const dotenv = require('dotenv');
dotenv.config();

// Setup MySql Connection
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
   developmentConfig.DB,
   developmentConfig.USER,
   developmentConfig.PASSWORD,
   {
      host: developmentConfig.HOST,
      dialect: developmentConfig.DIALECT,
      port: 3306,
      logging: false,
      pool: {
         max: developmentConfig.pool.max,
         min: developmentConfig.pool.min,
         acquire: developmentConfig.pool.acquire,
         idle: developmentConfig.pool.idle,
      },
   }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user')(sequelize, Sequelize);

module.exports = db;
