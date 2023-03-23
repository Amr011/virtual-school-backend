const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());
dotenv.config();

const indexRouter = require('./router/index.routes');
app.use('/api/v1/', indexRouter);

// Unavailable Request
app.use((req, res) => {
   res.status(404).json({
      error: '! خطأ , الصفحة المطلوبة غير موجودة ',
   });
});
// configuer database connection
const db = require('./model/index.model');
db.sequelize.sync().then(() => {
   console.log('Database sync successfully');
});

// Server Listenning method
const port = process.env.SERVER_PORT || 5100;
app.listen(port, async () => {
   try {
      console.log(`Server is running successfully on port ${port} `);
   } catch (err) {
      console.log('Unexpected Error : ', err);
   }
});
