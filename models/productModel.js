const mongoose=require("mongoose")

const productScehma=mongoose.Schema({
    id:{
        type:Number,
        required:true
    },name:{
        type:String,
        required:true
    },images:{
        type:[String],
        required:true
    },category:{
        type:String,
        required:true
    },newPrice:{
        type:Number,
        required:true,
    },oldPrice:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true
    }
})

const productModel=mongoose.model("Product",productScehma);

module.exports=productModel