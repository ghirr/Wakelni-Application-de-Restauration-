const mongoose = require('mongoose');  //import module mongoose 

const chefSchema= mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    description:String,
    numCin:{
        type: String,
        required: true,
        unique: true,
        length:8
    },
    image:{
        type: String,
        required: true,
    },
})

const chef = mongoose.model("chefs",chefSchema) 

module.exports=chef