const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        miniLength:3
    }
    ,
    mobile:{
        type:Number,
        required:true,
        unique:true,
        mini:10
    }
    ,
    email:{
        type:String,
        unique:true,
        required:true
    }
    ,
    password:{
        type:String,
        required:true,
        miniLength:5
    }
})

const User = mongoose.model(`User`, userSchema);
module.exports = User;

// // module.defult = User;
// // module.export = User;