module.exports = (sequelize, Sequelize) => {
   const user = sequelize.define('user', {
      firstname: {
         type: Sequelize.STRING,
         allowNull: true,
      },
      lastname: {
         type: Sequelize.STRING,
         allowNull: true,
      },
      email: {
         type: Sequelize.STRING,
         allowNull: true,
      },
      password: {
         type: Sequelize.STRING,
         allowNull: true,
      },
   });

   return user;
};
