const express = require('express');
const mongoose = require('mongoose');
const bcyrpt = require('bcrypt');
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

app.use(methodOverride('_method',{
  methods: ['POST', 'GET'],
}))

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
  const url = await Url.find().sort('-date');
  res.status(200).render('dashboard',{
    url,
  });
});

app.post('/url', async (req, res) => {
    const url = await Url.create({
      name: req.body.name,
      description: req.body.description,
    });
    res.status(201).redirect('/');
  });

app.get('/register',(req,res)=>{
    res.status(200).render('register');
})

app.get('/login',(req,res)=>{
  res.status(200).render('login');
})

app.post('/user/login',async(req,res)=>{
  const { email, password } = req.body;
  let user = null;
  user = await User.findOne({email:email});
  let same = null;
  same = await bcyrpt.compare(password,user.password);
  
  if(same){
    console.log("Şifre doğrulandı.");
  }
})

app.post('/user/signup',(req,res)=>{
  console.log(req.body);
  const user = User.create(req.body);
  res.redirect('/');
})

const port = 3000;
app.listen(port, () => {
  console.log(`${port} is started`);
});
