const mongoose = require('mongoose');  //import module mongoose 

const platSchema= mongoose.Schema({
    name:String,
    categorie:String,
    description:String,
    price:Number,
    image:String,
})

const plat = mongoose.model("plats",platSchema) 

module.exports=plat