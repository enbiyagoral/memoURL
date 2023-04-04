const express = require('express');
const mongoose = require('mongoose');
const bcyrpt = require('bcrypt');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const methodOverride = require('method-override');

const Url = require('./model/Url');
const User = require('./model/User');
const path = require('path');

const pageRoute = require('./routes/pageRoute');
const userRoute = require('./routes/userRoute');
const urlRoute = require('./routes/urlRoute');

const app = express();
// Middlewares
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'f05c130b-0322-42e8-9e3d-33a876f2af11', // 3. Şahıs görmemesi için aslında gizli tutulması gereken yer.
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1/memo-url-db' }),
  })
);

app.use(cookieParser());

app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

app.use(function (req, res, next) {
  res.locals.isAuth = req.session.isAuth;
  next();
});

global.userIN = null;

app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
});

// DB Connection
mongoose
  .connect('mongodb://127.0.0.1:27017/memo-url-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Veritabanına bağlantı sağlandı!');
  })
  .catch((error) => {
    console.log(error.message);
  });

// Route
app.use('/', pageRoute);
app.use('/user', userRoute);
app.use('/url', urlRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`${port} is started`);
});
