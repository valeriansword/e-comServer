const express=require("express");
const { createUser, loginUser, addToCart, removeFromCart, getCart } = require("../controllers/userController");
const fetchUser = require("../middleware/Authmiddleware");

const router=express.Router();

router.route("/signup").post(createUser);
router.route("/login").post(loginUser)
router.route("/addToCart").post(addToCart)
router.route("/removeFromCart").post(removeFromCart)
 router.route("/getCart").post(getCart)
module.exports=router