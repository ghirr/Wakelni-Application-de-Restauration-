const express = require("express");
const multer = require("multer");
const chef = require("../model/chefmodel");
const Chef = require("../model/chefmodel"); //import model chef
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
    const imgName = name + "-" + Date.now() + "-chef-" + "." + extension;
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

  const chef = new Chef({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    description: req.body.description,
    numCin: req.body.numCin,
    image: url + "/images/" + req.file.filename,
  });
  
  chef.save().then(() => {
    res.status(200).json({ message: "chef added" });
  });
});





    //   trait logique get all chefs
    router.get("", (req, res) => {
      Chef.find().populate().then((findedObject) => {
        res.status(200).json({
          chefs: findedObject,
        });
      });
    });
    //   trait logique delete chef
router.delete("/:id", (req, res) => {
  console.log("here into delete", req.params.id);
  chef.deleteOne({ _id: req.params.id }).then(() => {
    res.status(200).json({
      message: "chef deleted",
    });
  });
});
//   trait logique get chef by Id
router.get("/:id", (req, res) => {
  console.log("here into get chef by id", req.params.id);
  chef.findOne({ _id: req.params.id }).then((data) => {
    res.status(200).json({
      chef: data,
    });
  });
});
//trait update chef

router.put("", (req, res) => {
  const Chef = {
    _id: req.body._id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    description: req.body.description,
    numCin: req.body.numCin,
  };
  chef.findOneAndUpdate({ _id: req.body._id }, Chef).then(() => {
    res.status(200).json({
      message: "up to date chef",
    });
  });
});

  module.exports = router;
 
 