const express = require('express');
const app = express();
const port = 8000;
const path = require('path');

//public static path
console.log(path.join(__dirname, "..public"));
const static_path = path.join(__dirname, "../public");
app.use(express.static(static_path));

//template views engine path
const template_path = path.join(__dirname, "../templates/views");
app.set('view engine', 'hbs');
app.set('views', template_path)


// routing
app.get("/signin", (req,res)=>{
    res.render('signin')
})

app.get("/signup", (req,res)=>{
    res.render('signup')
})

app.listen(port, ()=> {
    console.log(`listening to the port at ${port}`)
})