const express = require('express');
const app = express();
const port = 8000;
const path = require('path');

//public static path
console.log(path.join(__dirname, "..public"));
const static_path = path.join(__dirname, "../public");
app.use(express.static(static_path));

app.get("/try", (req,res)=>{
    res.send("welcome to")
})

app.listen(port, ()=> {
    console.log(`listening to the port at ${port}`)
})