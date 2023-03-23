const db = require('../model/index.model');
const userModel = db.user;

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

class user {
   // User Register New Account
   static userRegister = async (req, res) => {
      const { firstname, lastname, email, password } = req.body;
      // user existing validation
      const userE = await userModel.findOne({ where: { email: email } });
      if (userE) {
         return res
            .status(400)
            .json({ error: 'This Email is Already Registered !' })
            .end();
      }

      // register user & hash password
      bcrypt.hash(password, 12).then((hash) => {
         userModel
            .create({
               firstname: firstname,
               lastname: lastname,
               email: email,
               password: hash,
            })
            .then((registerdUser) => {
               if (registerdUser != null) {
                  return res.status(200).json({
                     success: true,
                     message: 'Successfully Registered !',
                  });
               }
            })
            .catch((err) => {
               console.log(err);
               return res.status(400).json({
                  message: 'Unexpected Error',
                  status: 400,
                  error: err,
               });
            });
      });
   };

   // User Login From Existing Account
   static userLogin = async (req, res) => {
      const { email, password } = req.body;

      const user = await userModel.findOne({
         include: [],
         where: {
            email: email,
         },
      });

      if (!user) {
         return res
            .status(400)
            .json({
               error: 'There is now no user mach with the data entered !',
            })
            .end();
      }
      const dbPassword = user.password;

      bcrypt.compare(password, dbPassword).then((match) => {
         if (!match) {
            return res.status(400).json({
               error: 'Error With Email Or Password !',
            });
         }

         const accessToken = jwt.sign(
            {
               id: user.id,
               firstname: user.firstname,
               lastname: user.lastname,
               email: user.email,
            },
            process.env.ACCESS_TOKEN
         );

         res.cookie('access-token', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30, // 1 mounth
            httpOnly: true,
         });

         return res.status(200).json({
            message: 'Successfully Logged In !',
            accessToken: accessToken,
         });
      });
   };

   // User Logout From Existing Account
   static userLogout = async (req, res) => {
      try {
         const accessToken = await jwt.sign(
            { email: user.email, id: user.id },
            process.env.ACCESS_TOKEN
         );

         res.cookie('access-token', accessToken, {
            maxAge: 1, // 0.001 sec
            httpOnly: true,
         });

         return res.status(200).json({
            success: true,
            message: `Successfully Logged Out`,
         });
      } catch (err) {
         console.log(err);
         return res.status(400).json({
            message: 'Unexpected Error',
            status: 400,
            error: err,
         });
      }
   };

   // User Profile Data
   static userProfile = async (req, res) => {
      try {
         const userId = req.params.id;
         return res.status(200).json(`Here Is User Profile Data ${userId}`);
      } catch (err) {
         console.log(err);
         return res.status(400).json({
            message: 'Unexpected Error',
            status: 400,
            error: err,
         });
      }
   };
}
module.exports = user;
