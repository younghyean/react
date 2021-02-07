const express = require('express');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb+srv://root:1234@cluster0.cu0gf.mongodb.net/test?retryWrites=true&w=majority',{
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify: true
}).then(() => console.log('connect success'))
  .catch(err => console.log(err))
const port  =3000;
// respond with "hello world" when a GET request is made to the homepage
//
app.get('/', function(req, res) {
  res.send('hello world 안녕하세요');
});
app.listen(port, () => console.log(`example app listening on port ${port}!`));