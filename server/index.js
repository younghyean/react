const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require("./config/key");

const {User} = require("./models/User");
const {auth} = require("./middleware/auth");
const app = express();

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//allpication/json
app.use(bodyParser.json());
app.use(cookieParser());


mongoose.connect(config.mongoURI,{
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
app.post('/api/users/register',(req, res) =>{  

    const user = new User(req.body);

    user.save((err,userInfo) =>{
        if(err) return res.json({ success : false, err});
        return res.status(200).json({
            success : true
        })
    });

});


app.post('/api/users/login',(req,res)=>{
  User.findOne({ email : req.body.email }, (err,user)=>{
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }

    user.comparePassword(req.body.password , (err, isMatch) =>{
        if(!isMatch)
          return res.json ({loginSuccess : false, message : "비밀번호가 틀렸습니다."});
        
        user.generateToken((err, user)=>{
            if(err) return res.status(400).send(err);

            //토큰 저장
            res.cookie("x_auth",user.token)
            .status(200)
           .json({loginSuccess : true, userId : user._id}); 

        });
    });
  });
});



//인증처리 
app.get('/api/users/auth', auth ,(req,res)=>{
  
  
  res.status(200).json({
      _id : req.user._id,
      isAdmin : req.user.role === 0 ? false : true, //role 0이면 일반, 1이면 관리자
      isAuth : true,
      email : req.user.email,
      name : req.user.name,
      lastname : req.user.lastname,
      role : req.user.role,
      image : req.user.image
  });
});



//로그아웃
app.get('/api/users/logout', auth ,(req, res)=>{
  
  User.findOneAndUpdate({_id : req.user._id},
    { token : ""}
    ,(err, user)=> {
      if(err) return res.json({success : false, err});
      return res.status(200).send({
        success : true
      });
    });


});


app.listen(port, () => console.log(`example app listening on port ${port}!`));