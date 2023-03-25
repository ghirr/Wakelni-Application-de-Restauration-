const mongoose = require('mongoose');  //import module mongoose
const tableSchema= mongoose.Schema({
    name: String,
    idUser:String,
    email:String,
    guests:Number,
    phoneNumber: String,
    date:String,
    time:String,
    note:String,
})

const table = mongoose.model("Table",tableSchema) 

module.exports=table