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

    let url = req.protocol + "://" + req.get("host");
      const Plat = new plat({
        name: req.body.name,
        categorie: req.body.categorie,
        description: req.body.description,
        price: req.body.price,
        image: url + "/images/" + req.file.filename,
      });
  
      Plat.save().then(() => {
        res.status(200).json({ message: "plats added" });
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
      message: "deleted",
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

router.put("", (req, res) => {
  const Plat ={
    name: req.body.name,
    categorie: req.body.categorie,
    description: req.body.description,
    price: req.body.price,
  };
  plat.updateOne({ _id: req.body._id }, Plat).then(() => {
    res.status(200).json({
      message: "up to date plat",
    });
  });
});
  module.exports = router;