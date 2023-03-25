const express = require("express");
const Table = require("../model/tablemodel");
const router = express.Router();

router.post(
    "",
    (req, res) => {
      console.log("here req body", req.body);
        const table = new Table({
          name: req.body.name,
          email: req.body.email,
          idUser: req.body.idUser,
          guests:req.body.guests,
          phoneNumber: req.body.phoneNumber,
          date:req.body.date,
          time:req.body.time,
          note:req.body.note,
        });
    
        table.save().then(() => {
          res.status(200).json({ message: "table added" });
        });
      }
    );
      //   trait logique get all tables
router.get("", (req, res) => {
    Table.find()
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
        message: "deleted",
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
    const table ={
        name: req.body.name,
        email: req.body.email,
        guests:req.body.guests,
        phoneNumber: req.body.phoneNumber,
        date:req.body.date,
        time:req.body.time,
        note:req.body.note,
    };
    Table.updateOne({ _id: req.body._id }, table).then(() => {
      res.status(200).json({
        message: "up to date table",
      });
    });
  });
   //   trait logique get table by user Id
  router.get("/:id/user", (req, res) => {
      console.log("here into get table by Userid", req.params.id);
      Table.find({ idUser: req.params.id }).then((data) => {
        res.status(200).json({
          table: data,
        });
      });
    });
    module.exports = router;