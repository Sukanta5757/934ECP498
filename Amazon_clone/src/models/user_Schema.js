const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        miniLength: 3
    }
    ,
    mobile:{
        type: Number,
        required: true,
        unique: true,
        mini: 10
    }
    ,
    email:{
        type: String,
        unique: true,
        required: true
    }
    ,
    password:{
        type: String,
        required: true,
        miniLength: 5
    },
    tokens:[{
        token:{
        type: String,
        required: true
        }
    }]
})

// generate token  
userSchema.methods.generateToken = async function(){
    try{
        const token = jwt.sign({_id: this._id.toString()}, "mynamemaabinjhagiriprojectandjob");
        this.tokens = this.tokens.concat({token:token})
        await this.save();
        console.log(token + "sign token");
        return token;
    } catch (error){
        res.send("the error part" + error);
        console.log("the error part" + error);
    }
}

const User = mongoose.model(`User`, userSchema);
module.exports = User;