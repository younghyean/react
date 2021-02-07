const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {User} = require("./models/User");
const app = express();

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//allpication/json
app.use(bodyParser.json());
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

//회원 가입 할때 필요한 정보들을 client에서 가져오면 db에 넣어준다.
app.post('/register',(req, res) =>{  
    const user = new User(req.body);
    user.save((err,userInfo) =>{
        if(err) return res.json({ success : false, err});
        return res.status(200).json({
            success : true
        })
    });

})



app.listen(port, () => console.log(`example app listening on port ${port}!`));