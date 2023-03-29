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
  async(req, res) => {
    console.log("here req body", req.body);
    console.log("here req files", req.file);
    const data = await Chef.findOne({ numCin: req.body.numCin });
    if (data?.numCin) {
      res.status(400).json({
        message: "numCin is Already used",
      });}else{
        if(req.body.description=='undefined'){
          req.body.description='pas de description'
        }
    let url = req.protocol + "://" + req.get("host");
  const chef = new Chef({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    description: req.body.description,
    numCin: req.body.numCin,
    image: url + "/images/" + req.file?.filename,
  });
  if(!req.body.firstName ||req.body.firstName=='undefined'){
    return res.status(400).json({ message: "First Name required" });
   }
   if(!req.body.lastName||req.body.lastName=='undefined'){
    return res.status(400).json({ message: "last Name required" });
   }
   if(!req.body.numCin||req.body.numCin=='undefined'){
    return res.status(400).json({ message: "numero cin required" });
   }
  if(req.body.numCin.length!== 8){
    return res.status(400).json({ message: "numCin langeur 8" });
   }
   if(!req.file||!req.file.filename){
    return res.status(400).json({ message: "image required" });
   }
  chef.save().then((chef) => {
    res.status(200).json({ message: "chef added" });
  }).catch((error) => {
    res.status(500).json({
      error: error,
    });
  });
}
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

router.put("/:id",multer({ storage: storage }).single("image"), (req, res, next) => {
 
  const updatedChef = new Chef({
    _id: req.params.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    description: req.body.description,
    numCin: req.body.numCin,
  });

  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    updatedChef.image = url + "/images/" + req.file.filename;
  }
  if(req.body.description=='pas de description'||req.body.description=='undefined'||req.body.description==''){
    req.body.description='pas de description'
  }
  Chef.findOneAndUpdate(
    { _id: req.params.id },
    updatedChef,
    { new: true }
  )
    .then((chef) => {
      if(!req.body.firstName ||req.body.firstName=='undefined'){
        return res.status(400).json({ message: "First Name required" });
       }
       if(!req.body.lastName||req.body.lastName=='undefined'){
        return res.status(400).json({ message: "last Name required" });
       }
       if(!req.body.numCin||req.body.numCin=='undefined'){
        return res.status(400).json({ message: "numero cin required" });
       }
      if(req.body.numCin.length!== 8){
        return res.status(400).json({ message: "numCin langeur 8" });
       }
       if(!req.file||!req.file.filename){
        return res.status(400).json({ message: "image required" });
       }
      res.status(200).json({
        message: "Chef updated successfully",
        chef: chef,
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
    
});

  module.exports = router;
 
 