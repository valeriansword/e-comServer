const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const userSchema= mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,

    },
    cartData:{
        type:Object,
    },date:{
        type:Date,
        default:Date.now,
    }
})
userSchema.methods.matchPassword=async function(passKey){
    return await bcrypt.compare(passKey,this.password)
      
}
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next(); 
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
})

const userModel=mongoose.model("Users",userSchema);
 module.exports=userModel