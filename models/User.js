const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const saltRounds = 10;

const userSchema = mongoose.Schema({
    name: {
        type : String,
        maxlengt : 50
    },
    email :{
        type : String,
        trim : true,
        unique : 1
    },
    password : {
        type : String,
        maxlengt : 5
    },
    lastname : {
        type : String,
        maxlengt : 50
    },
    role : {
        type : Number,
        default : 0
    },
    image : String,
    token : {
        type : String
    },
    tokenExp : {
        type : Number
    }
});

userSchema.pre('save',function(next){
    let user =this;
    if(user.isModified('password')){
    //비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err);
                user.password = hash;
                next();
            });
        });
    }else{
        next();
    }

})

userSchema.methods.comparePassword = function(plainPassword, cb){
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    });
};

 //토큰 생성
userSchema.methods.generateToken=function(cb){
    let user = this;
    let toekn = jwt.sign( user._id.toHexString() , 'secretToken');
    user.token = toekn;
    user.save(function(err, user){
        if(err) return cb(err);
        cb(null, user);
    });
};

//토큰 찾아서 확인
userSchema.methods.findByToken = function(token, cb){
    var user = this;
    user._id + '' = token;
    jwt.verify(token, 'secretToken', function(err, decoded){
        
        user.findOne({"_id" : decoded, "token": token}, function(err, user){
            if(err) return cb(err);
            cb(null, user);
        });

    });
};

const User = mongoose.model('User', userSchema);
module.exports ={User};