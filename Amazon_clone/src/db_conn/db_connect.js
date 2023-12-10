const mongoose = require("mongoose");
const DB_URL = "mongodb://127.0.0.1:27017/userdatabase";


//creating a database
mongoose.connect(DB_URL, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection successful");
}).catch((err)=>{
    console.log("not connect")
})