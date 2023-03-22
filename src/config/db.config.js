const dotenv = require('dotenv');
dotenv.config();

const developmentConfig = {
   HOST: process.env.DB_HOST,
   USER: process.env.DB_USER,
   PASSWORD: process.env.DB_PASSWORD,
   DB: process.env.DB_NAME,
   DIALECT: process.env.DB_DIALECT,
   pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
   },
};

module.exports = developmentConfig;
