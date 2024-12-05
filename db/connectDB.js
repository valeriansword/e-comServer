const mongoose=require("mongoose")

const connectDb=(url)=>{
    mongoose.set("strictQuery",true);
    mongoose.connect(url).then(res=>{
        console.log("db connected");
    }).catch(err=>{console.log(err)});


}
module.exports=connectDb;