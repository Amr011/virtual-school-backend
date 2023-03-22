const dotenv = require('dotenv');
dotenv.config();

const { sign, verify } = require('jsonwebtoken');

const createTokens = (user) => {
   const accessToken = sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_TOKEN
   );

   return accessToken;
};

const validateToken = (req, res, next) => {
   const accessToken = req.cookies['access-token'];
   if (!accessToken) {
      return res.status(400).json({ error: '! يجب عليك تسجيل الدخول اولاً' });
   }

   try {
      const validToken = verify(accessToken, process.env.ACCESS_TOKEN);
      req.user = validToken;

      if (validToken) {
         req.authenticated = true;
         return next();
      }
   } catch (err) {
      return res.status(400).json({ error: err });
   }
};

module.exports = { createTokens, validateToken };
