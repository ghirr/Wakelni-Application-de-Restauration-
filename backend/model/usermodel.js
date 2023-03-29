const mongoose = require('mongoose');  //import module mongoose
const userSchema= mongoose.Schema({
    firstName:{
        type: String,
        required: true,
     },
    lastName:{
        type: String,
        required: true,
     },
    email:{
        type: String,
        required: true,
        unique: true
    },
     password: {
        type: String,
        select: true,
        required: true,
    },
    role:String
})

const user = mongoose.model("User",userSchema) 

module.exports=user