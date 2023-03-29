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
        message: "Email is Already used",
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
              service: "gmail",
              auth: {
                user: "islem24762048@gmail.com",
                pass: "mnecvzwcnglgqyxr",
              },
            });
  
            const mailOptions = {
              from: "dingoResto@officiel.com",
              to: req.body.email,
  
              subject: "Dingo_Restaurent",
              html: "Nous sommes heureux de vous accueillir sur notre site de restauration. Votre compte a bien été créé.</p><p>Vous pouvez vous connecter à votre compte en utilisant le lien ci-dessous :</p><p><a href='https://www.mon-site-de-restauration.com/connexion'>Se connecter</a></p><p>À bientôt !</p>",
            };
  
            transporter.sendMail(mailOptions, (error)=>{
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
              }
            });
            res.status(200).json({ message: "register succesfully" });
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
          message: "please verify your credentials",
        });
      } else {
        console.log(req.body.password);
        console.log("findedUser:", findedUser);
        let comPwd = await bcrypt.compare(req.body.password, findedUser.password);
        console.log("here co pwf", comPwd);
        if (!comPwd) {
          res.status(200).json({
            message: "please verify your credentials",
          });
        } else {
          let user = {
            id: findedUser._id,
            firstName: findedUser.firstName,
            lastName: findedUser.lastName,
            email: findedUser.email,
            role:findedUser.role
          };
          res.status(200).json({
            message: "Welcome "+user.firstName,
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