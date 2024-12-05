
const multer=require("multer")
const path = require("path");
const productModel = require("../models/productModel");

const storage=multer.diskStorage({
    destination:"./upload/images",
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload=multer({storage:storage, limits: { fileSize: 5 * 1024 * 1024 },})

const imagePost = (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(500).json({ success: false, error: "No files uploaded" });
    }

    const imageUrls = req.files.map(file => `http://localhost:${process.env.PORT}/images/${file.filename}`);
    res.status(200).json({
        success: true,
        imageUrls,
        message: "Files uploaded successfully",
    });
};


const addProduct=async(req,res)=>{

    try{
        let products=await productModel.find({});
        let id;
        if(products.length>0){
            let lastProductArray=products.slice(-1);
            let lastProduct=lastProductArray[0];
            id=lastProduct.id+1;
        }else{
            id=1;
        }

        const product=new productModel({
            id:id,
            name:req.body.name,
            category:req.body.category,
            images:req.body.images,
            newPrice:req.body.newPrice,
            oldPrice:req.body.oldPrice,
    
        });
        console.log(product)
        await product.save();
        console.log("saved");
        res.json({
            success:true,
            name:req.body.name,
        })
    }catch(err){
        console.log(err);
        res.json({
            success:false,
            message:err
        })
    }
    
}
const deleteProduct=async(req,res)=>{
    try{
        await productModel.findOneAndDelete({id:req.body.id});
        console.log("removed");
        return res.json({success:true,name:req.body.name});
    }catch(err){
        console.log(err);
        return req.json({success:false,message:err})
    }

}

const allProduct=async(req,res)=>{
    try{
      const products=  await productModel.find({});
      res.json({success:true,products:products});
    }catch(err){
        console.log(err);
        res.json({success:false,message:err})
    }
}
module.exports={imagePost,upload,addProduct,deleteProduct,allProduct}