const express=require("express");
const {imagePost,upload} = require("../controllers/postController");
const router=express.Router();

router.route("/").post(upload.array("products", 5),imagePost)

module.exports=router