const express = require('express');
const mongoose = require('mongoose');
const Url = require('./model/Url');
const path = require('path');
const methodOverride = require('method-override')
const app = express();

// Middlewares
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Bu middleware'i araştırcaz öğrencez
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

// DB CONNECTION
mongoose.connect('mongodb://127.0.0.1:27017/memo-url-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/', async(req, res) => {
  // res.sendFile(path.resolve(__dirname,'public/index.html'))
  const url = await Url.find().sort('-date');
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

app.put('/url-details/:id', async(req, res) => {
  const url = await Url.findById(req.params.id);
  url.name= req.body.name;
  url.description = req.body.description;
  url.save();
  res.redirect('/');
});



app.post('/url', async (req, res) => {
  const url = await Url.create({
    name: req.body.name,
    description: req.body.description,
  });
  res.status(201).redirect('/');
});

app.post('/url', async (req, res) => {
    const url = await Url.create({
      name: req.body.name,
      description: req.body.description,
    });
    res.status(201).redirect('/');
  });

// Url.create({
//     url: 'https://app.patika.dev/courses/nodejs/MongooseCRUD',
//     note: 'Mongoose CRUD İşlemleri'
// })
const port = 3000;
app.listen(port, () => {
  console.log(`${port} is started`);
});
