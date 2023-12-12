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
        mini:10
    }
    ,
    email:{
        type:String,
        required:true
    //     validate(value){
    //         if(!validator.isEmail(value)){
    //             throw new Error("Invalid email id")
    //         }
    //     }
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