const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
const hbs = require('hbs');
require('./db_conn/db_connect');
const User = require('./models/user_Schema');

app.use(express.json())
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
app.get("/signin", (req,res)=>{
    res.render('signin', {
        EmailMessege:"Enter Your Email ID",
        Password:"Enter Your Password",
        UserName:"sign in"
    })
})

app.post("/signin", async(req,res)=>{
    try {
       const email = req.body.mobile;
       const password = req.body.password;
       const useremail = await User.findOne({email:email});
        if(useremail.password === password  ){
            console.log(useremail.name ,"login successfull");
            res.status(201).render("index", {
                UserName:useremail.name,
            });
        }
        else{
            res.status(500).render("signin",{
                EmailMessege:"Invlid Email Id",
                Password:"Invlid Password",
                UserName:"sign in"
            });
        }     
    }
    catch(error) {
        res.status(500).render("signin");
    }
})

app.get("/signup", (req,res)=>{
    res.render('signup')
})

app.post("/signup", async(req,res)=>{
    try{
        const userData = new User({
            name : req.body.name, 
            mobile : req.body.mobile,
            email : req.body.email,
            password : req.body.password
        });
        await userData.save();
        res.status(201).render("index");
    }catch (error){
        res.status(500).send(error);
    }
})

app.get("/home", (req,res)=>{
    res.render('index')
})

app.get("/wish_list", (req,res)=>{
    res.render('wish_list')
})

app.listen(port, ()=> {
    console.log(`listening to the port at ${port}`)
})