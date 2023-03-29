const express = require("express");
const multer = require("multer");
const plat = require("../model/platmodel");
const router = express.Router();

const MIME_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("Mime type is invalid");
    if (isValid) {
      error = null;
    }
    cb(null, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE[file.mimetype];
    const imgName = name + "-" + Date.now() + "-plat-" + "." + extension;
    cb(null, imgName);
  },
});


router.post(
  "",
  multer({ storage: storage }).single("image"),
  (req, res) => {
    console.log("here req body", req.body);
    console.log("here req files", req.file);
    if(req.body.description=='undefined'){
      req.body.description='pas de description'
    }
    let url = req.protocol + "://" + req.get("host");
      const Plat = new plat({
        name: req.body.name,
        categorie: req.body.categorie,
        description: req.body.description,
        price: req.body.price,
        image: url + "/images/" + req.file?.filename,
      });
      if(!req.body.name ||req.body.name=='undefined'){
        return res.status(400).json({ message: "Name required" });
       }
       if(!req.body.categorie||req.body.categorie=='undefined'||req.body.categorie==!'breakfast'){
        return res.status(400).json({ message: "categorie required" });
       }
       if (!(['breakfast', 'dinner', 'launch', 'both', 'sneaks'].includes(req.body.categorie))){
        return res.status(400).json({ message: "categorie is unknown" });
      }
       if(!req.body.price||req.body.price=='undefined'){
        return res.status(400).json({ message: "price required" });
       }
       if (!(/^[0-9]+$/.test(req.body.price.toString()))) {
        return res.status(400).json({ message: "invalid price" });
      }
       if(!req.file||!req.file.filename){
        return res.status(400).json({ message: "image required" });
       }
  
      Plat.save().then(() => {
        res.status(200).json({ message: "plats added" });
      }).catch((error) => {
        res.status(500).json({
          error: error,
        });
      });
    }
  );

  //   trait logique get all plats
router.get("", (req, res) => {
  plat.find()
    .populate({ path: "_id" })
    .then((data) => {
      res.status(200).json({
        plats: data,
      });
    });
});
//   trait logique delete plat
router.delete("/:id", (req, res) => {
  console.log("here into delete", req.params.id);
  plat.deleteOne({ _id: req.params.id }).then(() => {
    res.status(200).json({
      message:"plat deleted",
    });
  });
});
//   trait logique get plat by Id
router.get("/:id", (req, res) => {
  console.log("here into get plat by id", req.params.id);
  plat.findOne({ _id: req.params.id }).then((data) => {
    res.status(200).json({
      plat: data,
    });
  });
});
//trait update plat

router.put("/:id",multer({ storage: storage }).single("image"), (req, res, next) => {
  
  if(req.body.description=='pas de description'||req.body.description=='undefined'||req.body.description==''){
    req.body.description='pas de description'
  }
  const updatedPlat = new plat({
        _id: req.params.id,
        name: req.body.name,
        categorie: req.body.categorie,
        description: req.body.description,
        price: req.body.price,
  });

  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    updatedPlat.image = url + "/images/" + req.file.filename;
  }

  plat.findOneAndUpdate(
    { _id: req.params.id },
    updatedPlat,
    { new: true }
  )
    .then((plat) => {
      if (!plat) {
        return res.status(404).json({ message: "plat not found" });
      }
      if(!req.body.name ||req.body.name=='undefined'){
        return res.status(400).json({ message: "Name required" });
       }
       if(!req.body.categorie||req.body.categorie=='undefined'||req.body.categorie==!'breakfast'){
        return res.status(400).json({ message: "categorie required" });
       }
       if (!(['breakfast', 'dinner', 'launch', 'both', 'sneaks'].includes(req.body.categorie))){
        return res.status(400).json({ message: "categorie is unknown" });
      }
       if(!req.body.price||req.body.price=='undefined'){
        return res.status(400).json({ message: "price required" });
       }
       if (!(/^[0-9]+$/.test(req.body.price.toString()))) {
        return res.status(400).json({ message: "invalid price" });
      }
       if(!req.file||!req.file.filename){
        return res.status(400).json({ message: "image required" });
       }
      res.status(200).json({
        message: req.body.name+" updated successfully",
        plat: plat,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
});
  module.exports = router;