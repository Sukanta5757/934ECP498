const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
const hbs = require('hbs');
require('./db_conn/db_connect');
const User = require('./models/user_Schema');
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const auth = require('./middleware/auth');

app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
//public static path
console.log(path.join(__dirname, "../public"));
const static_path = path.join(__dirname, "../public");
app.use(express.static(static_path));

//template views engine path
const template_path = path.join(__dirname, "../templates/views");
app.set('view engine', 'hbs');
app.set('views', template_path)

//template partials path
const partials_path = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partials_path);

// routing
// singup router start
app.get("/signup", (req,res)=>{
    res.render('signup', {
        UserName:"sign in",
        signin:"Sign in"
    })
})

app.post("/signup", async(req,res)=>{
    try{
        const userData = new User({
            name : req.body.name, 
            mobile : req.body.mobile,
            email : req.body.email,
            password : req.body.password
        });

        // generate token 
        const token = await userData.generateToken();
        console.log("sign token" + token)
        //cookie
        res.cookie("jwt", token, {
            // expires: new Date(Date.now()+ 60000),
            httpOnly: true
        })

        await userData.save();
        res.status(201).render("index", {
            UserName:userData.name,
            signin:"Hello "+userData.name,
            logout:"Logout"
        });
    }catch (error){
        res.status(500).render("signup",{
            alert:"Email or Number Already Registion... ",
            UserName:"sign in",
            signin:"Sign in"
        });
    }
})
// signin router end

// signin router start
app.get("/signin", (req,res)=>{
    res.render('signin', {
        EmailMessege:"Enter Your Email ID",
        Password:"Enter Your Password",
        UserName:"sign in",
        signin:"Sign in"
    })
})

app.post("/signin", async(req,res)=>{
    try {
       const email = req.body.email;
       const password = req.body.password;
       const useremail = await User.findOne({email:email});

       //cookie
       const token = await useremail.generateToken();
        res.cookie("jwt", token, {
        // expires: new Date(Date.now()+ 60000),
        httpOnly: true
        })
    

        if(useremail.password === password  ){
            console.log(useremail.name ,"login successfull");
            res.status(201).render("index", {
                UserName:useremail.name,
                signin:"Hello "+useremail.name,
                logout:"Logout"
            });
        }    
    }
    catch(error) {
        res.status(500).render("signin",{
            EmailMessege:"Invlid Email Id",
            Password:"Invlid Password",
            UserName:"sign in",
            signin:"Sign in"
        });
    }
})
// signin router end

//home router start
app.get("/home", (req,res)=>{
    res.render('index',{
        UserName:"sign jhjhin",
        signin:"Sign in"
    })
})
//home router end

//wish_list router start
app.get("/wish_list",auth, (req,res)=>{
    // console.log(req.cookies.jwt +" signin tok");
    res.render('wish_list', {
        UserName:req.user.name,
        signin:"Hello "+req.user.name,
        logout:"Logout"
    })
    console.log(req.user.name+ "jhjg");
})
// wish_list router end 

// logout router start 
app.get("/logout",auth, async(req,res)=>{
    try{
        // req.user.tokens = req.user.tokens.filter((tokenucrr)=> {
        //     return tokenucrr.token !== req.token
        // })
        req.user.tokens = [];
        res.clearCookie("jwt")
        console.log("logout succuss")
        await req.user.save();
        res.render('signin'
        ,{
            EmailMessege:"Enter Your Email ID",
            Password:"Enter Your Password",
            UserName:"sign in",
            signin:"Sign in"
        }
        )
    }catch(error){
        res.status(401).send(error)
    }
})
// logout router end 

// order & return router start 
app.get("/OrderReturn", auth, (req,res)=>{
    res.render("OrderReturn",{
        UserName:req.user.name,
        signin:"Hello "+req.user.name,
        logout:"Logout"
    })
})
// order & return router end 

// Your Account router start 
app.get("/YourAccount", auth, (req,res)=>{
    res.render("YourAccount",{
        UserName:req.user.name,
        signin:"Hello "+req.user.name,
        logout:"Logout"
    })
})
// Your Account router end

app.listen(port, ()=> {
    console.log(`listening to the port at ${port}`)
})