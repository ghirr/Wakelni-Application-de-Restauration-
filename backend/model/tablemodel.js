const mongoose = require('mongoose');  //import module mongoose
const tableSchema= mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    idUser:String,
    email:String,
    guests:Number,
    phoneNumber: {
        type: String,
        required: true,
        length:8
    },
    date:{
        type: String,
        required: true,
    },
    time:{
        type: String,
        required: true,
    },
    note:String,
})

const table = mongoose.model("Table",tableSchema) 

module.exports=table