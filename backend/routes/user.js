const express = require("express");
const bcrypt = require("bcrypt"); //import module Bcrypt
const userrouter = express.Router();
const User = require("../model/usermodel"); //import model User
const nodemailer = require("nodemailer"); //import module nodemailer
const { async } = require("rxjs");

//   trait logique add user
userrouter.post("/sign-up", async (req, res) => {
    const data = await User.findOne({ email: req.body.email });
    if (data?.email) {
      res.status(200).json({
        message: "0",
      });
    } else {
      bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) {
          console.log(err);
        } else {
          const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
            role:"user",
            
          });
  
          user.save().then(() => {
            const transporter = nodemailer.createTransport({
              host:"http://localhost",
              port:4200,
              service: "Outlook",
              auth: {
                user: "islem24762048@gmail.com",
                pass: "Ghirr02#@",
              },
            });
  
            const mailOptions = {
              from: "dingoresto@gmail.com",
              to: req.body.email,
  
              subject: "signUp",
              text: "Marhbee bik chez Dingo.",
            };
  
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
              }
            });
            res.status(200).json({ message: "1" });
          });
        }
      });
    }
  });
  //trait logique login
  userrouter.post("/login", (req, res) => {
    console.log("hereeeee into loginnn");
    console.log(req.body);
  
    User.findOne({ email: req.body.email }).then(async (findedUser) => {
      if (!findedUser) {
        res.status(200).json({
          message: "0",
        });
      } else {
        let comPwd = await bcrypt.compare(req.body.password, findedUser.password);
        console.log("here co pwf", comPwd);
        if (!comPwd) {
          res.status(200).json({
            message: "1",
          });
        } else {
          let user = {
            id: findedUser._id,
            firstName: findedUser.firstName,
            lastName: findedUser.lastName,
            email: findedUser.email,
            password:findedUser.password,
            role:findedUser.role
          };
          res.status(200).json({
            message: "2",
            user: user,
          });
        }
      }
    });
  });


  userrouter.get("/getUsers",async (req, res) => {
     User.find().then(async(data) => {
      if(!data){
        console.log("khraaa");
      }else{
       res.status(200).json({
          data
       });}
     });
    });
/*    //   trait logique delete user
userrouter.delete("/:id", (req, res) => {
  console.log("here into delete", req.params.id);
  User.deleteOne({ _id: req.params.id }).then(() => {
    res.status(200).json({
      message: "user deleted",
    });
  });
});*/
  
  module.exports = userrouter;