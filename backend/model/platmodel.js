const mongoose = require('mongoose');  //import module mongoose 

const platSchema= mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    categorie:{
        type: String,
        required: true,
    },
    description:String,
    price:{
        type: Number,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
})

const plat = mongoose.model("plats",platSchema) 

module.exports=plat