const express=require("express");

const cors=require("cors")

const dotenv=require("dotenv")
const jwt=require("jsonwebtoken");
const path=require("path");
const connectDb = require("./db/connectDB");
const postRouter=require("./routes/postRoute")
const productRouter=require("./routes/productRoute.js")
const app=express();
const userRouter=require("./routes/userRoute.js");
app.use(express.json())
app.use(cors({
    origin:["https://e-comclient.onrender.com","http://localhost:5173"]
}));
dotenv.config()
app.use("/images", express.static(path.join(__dirname, "upload", "images")));
app.use("/upload",postRouter)
app.use("/products",productRouter)
app.use("/user",userRouter)
try{
    connectDb(process.env.MONGODB_URI)
}catch(err){
    console.log(err);
}



app.listen(process.env.PORT,()=>{
    console.log("started on port 3000");
})