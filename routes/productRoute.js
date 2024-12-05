const express=require("express");
const { addProduct, deleteProduct, allProduct} = require("../controllers/postController");
const router=express.Router();

router.route("/").get(allProduct)
router.route("/addProduct").post(addProduct)
router.route("/deleteProduct").post(deleteProduct)

module.exports=router