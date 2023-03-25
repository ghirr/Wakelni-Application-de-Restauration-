const mongoose = require('mongoose');  //import module mongoose
const userSchema= mongoose.Schema({
    firstName: String,
    lastName:String,
    email:String,
    password: String,
    role:String
})

const user = mongoose.model("User",userSchema) 

module.exports=user