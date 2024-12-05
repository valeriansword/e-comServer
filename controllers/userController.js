const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken");

const createUser=async(req,res)=>{
    const isEmail=await userModel.findOne({email:req.body.email});
    if(isEmail){
        return res.status(500).json({succes:false,message:"email already exist"});

    }else{
        try{
            let cart={};
        for(let i=0;i<300;i++){
            cart[i]=0;
        }
        const user=new userModel({
            name:req.body.userName,  
            email:req.body.email,
            password:req.body.password,
            cartData:cart
        })
        await user.save()
        const token = jwt.sign(
            { user: { id: user._id, email: user.email } }, 
            process.env.JWT_KEY, 
            { expiresIn: "1y" }
        );
        
        res.json({succes:true,
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                cartData:user.cartData
            },
            message:"user successfully registered"})

        }catch(err){
            console.log(err);
            return res.json({err:err})
        }
            }
}

const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.json({msg:"enter credentials"});
    }
    try{
        const user=await userModel.findOne({email});
        if(!user){
            return res.status(500).json({msg:"email id doesnt exist"});
        }
        const isPassword=await user.matchPassword(password);
        if(!isPassword){
            return res.status(500).json({msg:"wrong password"});

        }
        const token = jwt.sign(
            { user: { id: user._id, email: user.email } }, 
            process.env.JWT_KEY, 
            { expiresIn: "1y" }
        );
        
        return res.status(200).json({
            msg:"user logged in",
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                cartData:user.cartData
            },
            token
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({err:err});
    }

}
const addToCart=async(req,res)=>{
    try{
        let userData=await userModel.findOne({_id:req.body.id});
        
        userData.cartData[req.body.itemId]+=1;
        await userModel.findOneAndUpdate({_id:req.body.id},{cartData:userData.cartData})
        res.json({msg:"successfully update cartdata"})
    }catch(err){
        res.json({msg:err})
        console.log(err)
    }
  
}
const removeFromCart=async(req,res)=>{
    try{
        let userData=await userModel.findOne({_id:req.body.id});
        if(userData.cartData[req.body.itemId]>0){
            userData.cartData[req.body.itemId]-=1;
        await userModel.findOneAndUpdate({_id:req.body.id},{cartData:userData.cartData})
        res.json({msg:"successfully update cartdata"})
        }
        
    }catch(err){
        console.log(err)
        res.json({msg:err})
    }
  
 }
const getCart=async(req,res)=>{
    let userData=await userModel.findOne({_id:req.body.id});
    res.json({cartData:userData.cartData})

}
module.exports={createUser,loginUser,addToCart,removeFromCart,getCart}