const mongoose = require('mongoose');  //import module mongoose 

const chefSchema= mongoose.Schema({
    firstName:String,
    lastName:String,
    description:String,
    numCin:String,
    image:String,
})

const chef = mongoose.model("chefs",chefSchema) 

module.exports=chef