const express = require("express");
const Table = require("../model/tablemodel");
const router = express.Router();
const currentDate = new Date();
const day = currentDate.getDate();
const month = currentDate.getMonth() + 1; // les mois sont indexés à partir de 0, donc on ajoute 1
const year = currentDate.getFullYear();
console.log(currentDate);
const formattedDate = year + '-' + month + '-' + day;
const datenow=new Date(formattedDate);
const currentTime = currentDate.getHours();
console.log(currentTime);

//trait creat table
router.post(
  "",
  (req, res) => {
console.log(req.body.date);
    console.log("here req body", req.body);
    console.log(req.body.date < formattedDate);
    const table = new Table({
      name: req.body.name,
      email: req.body.email,
      idUser: req.body.idUser,
      guests: req.body.guests,
      phoneNumber: req.body.phoneNumber,
      date: req.body.date,
      time: req.body.time,
      note: req.body.note,
    });
    const inputDate = new Date(req.body.date);
    const day = inputDate.getDate();
    const month = inputDate.getMonth() + 1; // les mois sont indexés à partir de 0, donc on ajoute 1
    const year = inputDate.getFullYear();
    console.log(month);
    req.body.date = year + '-' + month + '-' + day;
    console.log(req.body.date);
    req.body.date =new Date(req.body.date);
   
    console.log(inputDate.getTime());
    console.log(currentDate.getTime());
    //Block Controle
    if (!req.body.name) {
      return res.status(400).json({ message: "name is required" });
    }
    if (!(/^[0-9]+$/.test(req.body.guests.toString()))) {
      return res.status(400).json({ message: "invalid number" });
    }
    if (!req.body.phoneNumber) {
      return res.status(400).json({ message: "phoneNumber is required" });
    }
    if (!(/^[0-9]+$/.test(req.body.phoneNumber))){
      return res.status(400).json({ message: "phoneNumber Invalid" });
    }
    if (req.body.phoneNumber.length!==8) {
      return res.status(400).json({ message: "phoneNumber length 8" });
    }
    if (!(/^(2|5|9|4|7|3)/.test(req.body.phoneNumber))){
      return res.status(400).json({ message: "phoneNumber 2/3/4/5/7/9" });
    }
    if (!req.body.date) {
      return res.status(400).json({ message: "date is required" });
    }
    if ((!(req.body.date instanceof Date))||req.body.date=='Invalid Date') {
      return res.status(400).json({ message: "Invalid Date" });
    }
    if (!(inputDate.getTime() >= datenow.getTime())) {
      return res.status(400).json({ message: "Its a passive Date" });
    }
    if (!req.body.time) {
      return res.status(400).json({ message: "time is required" });
    }
    if (!(['8AM TO 10AM', '10AM TO 12AM', '12AM TO 2PM', '2PM TO 4PM', '4PM TO 6PM', '6PM TO 8PM', '8PM TO 10PM','10PM TO 12PM'].includes(req.body.time))){
      return res.status(400).json({ message: "time is unknown" });
    }
    //-------------------------------------------------------------------//
    table.save().then(() => {
      res.status(200).json({ message: "table booked succesfuly" });
    }).catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
  }
);





//   trait logique get all tables
router.get("", (req, res) => {
  Table.find().sort({ "date": -1, "time": -1 })
    .populate({ path: "_id" })
    .then((data) => {
      res.status(200).json({
        tables: data,
      });
    });
});




//   trait logique delete table
router.delete("/:id", (req, res) => {
  console.log("here into delete", req.params.id);
  Table.deleteOne({ _id: req.params.id }).then(() => {
    res.status(200).json({
      message: "table deleted",
    });
  });
});



//   trait logique get table by Id
router.get("/:id", (req, res) => {
  console.log("here into get table by id", req.params.id);
  Table.findOne({ _id: req.params.id }).then((data) => {
    res.status(200).json({
      table: data,
    });
  });
});




//trait update table

router.put("", (req, res) => {
  const table = {
    name: req.body.name,
    email: req.body.email,
    guests: req.body.guests,
    phoneNumber: req.body.phoneNumber,
    date: req.body.date,
    time: req.body.time,
    note: req.body.note,
  };
  const inputDate = new Date(req.body.date);
    const day = inputDate.getDate();
    const month = inputDate.getMonth() + 1; // les mois sont indexés à partir de 0, donc on ajoute 1
    const year = inputDate.getFullYear();
    req.body.date = year + '-' + month + '-' + day;
    req.body.date =new Date(req.body.date);
  
    //Block Controle
    if (!req.body.name) {
      return res.status(400).json({ message: "name is required" });
    }
    if (!(/^[0-9]+$/.test(req.body.guests.toString()))) {
      return res.status(400).json({ message: "invalid number" });
    }
    if (!req.body.phoneNumber) {
      return res.status(400).json({ message: "phoneNumber is required" });
    }
    if (!(/^[0-9]+$/.test(req.body.phoneNumber))){
      return res.status(400).json({ message: "phoneNumber Invalid" });
    }
    if (req.body.phoneNumber.length!==8) {
      return res.status(400).json({ message: "phoneNumber length 8" });
    }
    if (!(/^(2|5|9|4|7|3)/.test(req.body.phoneNumber))){
      return res.status(400).json({ message: "phoneNumber 2/3/4/5/7/9" });
    }
    if (!req.body.date) {
      return res.status(400).json({ message: "date is required" });
    }
    if ((!(req.body.date instanceof Date))||req.body.date=='Invalid Date') {
      return res.status(400).json({ message: "Invalid Date" });
    }
    if (!(inputDate.getTime() >= datenow.getTime())) {
      return res.status(400).json({ message: "Its a passive Date" });
    }
    if (!req.body.time) {
      return res.status(400).json({ message: "time is required" });
    }
    if (!(['8AM TO 10AM', '10AM TO 12AM', '12AM TO 2PM', '2PM TO 4PM', '4PM TO 6PM', '6PM TO 8PM', '8PM TO 10PM','10PM TO 12PM'].includes(req.body.time))){
      return res.status(400).json({ message: "time is unknown" });
    }

  Table.updateOne({ _id: req.body._id }, table).then(() => {
    res.status(200).json({
      message: "table updated",
    });
  }).catch((error) => {
    res.status(500).json({
      error: error,
    });
  });
});


//   trait logique get table by user Id
router.get("/:id/user", (req, res) => {
  console.log("here into get table by Userid", req.params.id);
  Table.find({ idUser: req.params.id }).sort({ "date": 1, "time": 1 }).then((data) => {
    res.status(200).json({
      table: data,
    });
  }).catch((error) => {
    res.status(500).json({
      error: error,
    });
  });
});
module.exports = router;