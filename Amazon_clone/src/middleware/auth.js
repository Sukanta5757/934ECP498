const jwt = require("jsonwebtoken");
const User = require("../models/user_Schema");

const auth = async(req, res, next) =>{
    try{
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, "mynamemaabinjhagiriprojectandjob");
        console.log("vahgjg"+verifyUser);
        const user = await User.findOne({_id:verifyUser._id});
        console.log(user.name);
        req.token = token;
        req.user = user;
        next()
    }catch(error){
        // res.status(401).send(error);
        res.status(401).render('signin',{
            EmailMessege:"Enter Your Email ID",
            Password:"Enter Your Password",
            UserName:"sign in",
            signin:"Sign in"
        });
    }
}
module.exports = auth;