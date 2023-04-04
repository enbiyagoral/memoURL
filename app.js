const express = require('express');
const mongoose = require('mongoose');
const bcyrpt = require('bcrypt');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const Url = require('./model/Url');
const User = require('./model/User');
const path = require('path');
const methodOverride = require('method-override')
const app = express();



// Middlewares
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Bu middleware'i araştırcaz öğrencez
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret : "f05c130b-0322-42e8-9e3d-33a876f2af11", // 3. Şahıs görmemesi için aslında gizli tutulması gereken yer.
  resave : false,
  saveUninitialized : true,
  store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1/memo-url-db' }),
}))
app.use(cookieParser());

app.use(methodOverride('_method',{
  methods: ['POST', 'GET'],
}))

app.use(function(req,res,next){
  res.locals.isAuth = req.session.isAuth;
  next();
})
// DB CONNECTION
mongoose
.connect('mongodb://127.0.0.1:27017/memo-url-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=>{
  console.log("Veritabanına bağlantı sağlandı!");
})
.catch((error)=>{
  console.log(error.message);
})


app.get('/', async(req, res) => {
  const url = await Url.find().sort('-date').limit(4);
  res.render('index',{
    url,
  });
});

app.get('/url-details/:id', async (req, res) => {
  const url = await Url.findOne({_id:req.params.id});
  res.render('url-details',{
    url
  })
});

app.delete('/url-details/:id', async (req, res) => {
  const url = await Url.findOneAndRemove({_id:req.params.id});
  res.redirect('/');
});

app.put('/url-details/:id', async(req, res) => {
  const url = await Url.findById(req.params.id);
  url.name= req.body.name;
  url.description = req.body.description;
  url.save();
  res.redirect('/');
});

app.get('/urls', async (req, res) => {
  const url = await Url.find({user:req.session.userID}).sort('-date');
  
  // console.log(user.name);
  res.status(200).render('dashboard',{
    url,
    
  });
});

app.post('/url', async (req, res) => {
    const url = await Url.create({
      name: req.body.name,
      description: req.body.description,
      user: req.session.userID,
    });
    
    res.status(201).redirect('/');
  });

app.get('/register',(req,res)=>{
    res.status(200).render('register');
})

app.get('/login',(req,res)=>{
  res.status(200).render('login');
})

app.get('/logout',(req,res)=>{
  req.session.destroy();
  res.redirect('/login');
})

app.post('/user/login',async(req,res)=>{
  const { email, password } = req.body;
  let user = null;
  user = await User.findOne({email:email});
  let same = null;
  same = await bcyrpt.compare(password,user.password);
  
  if(same){
    console.log("Şifre doğrulandı.");
    req.session.isAuth = true;
    req.session.userID = user._id
    console.log(req.session.userID);
    // res.cookie("isAuth",1);
    return res.redirect('/');

  }else{
    
    res.cookie("isAuth",0);
    console.log("Şifre yanlış.");
    return res.redirect('/');
  }
})


global.userIN = null;

app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
});




app.post('/user/signup',(req,res)=>{
  console.log(req.body);
  const user = User.create(req.body);
  res.redirect('/');
})

const port = 3000;
app.listen(port, () => {
  console.log(`${port} is started`);
});
