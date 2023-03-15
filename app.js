const express = require('express');
const mongoose = require('mongoose');
const Url = require('./model/Url');
const path = require('path');

const app = express();

// Middlewares
app.use(express.static('public'));
app.set('view engine',"ejs");


// DB CONNECTION
mongoose.connect('mongodb://127.0.0.1:27017/memo-url-db',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})




app.get('/',(req,res)=>{
    // res.sendFile(path.resolve(__dirname,'public/index.html'))
    res.render('index');  
});

// Url.create({
//     url: 'https://app.patika.dev/courses/nodejs/MongooseCRUD',
//     note: 'Mongoose CRUD İşlemleri'
// })
const port = 3000;
app.listen(port,()=>{
    console.log(`${port} is started`);
})