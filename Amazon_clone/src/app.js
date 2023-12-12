const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
const hbs = require('hbs');
require('./db_conn/db_connect');
const User = require('./models/user_Schema');

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
    res.render('signin')
})

app.get("/signup", (req,res)=>{
    res.render('signup')
})

app.post("/signup", async(req,res)=>{
    try{
        // res.send(req.body);
        const userData = new User(req.body);
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