const jwt=require("jsonwebtoken")
const fetchUser=async(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        return res.json({err:"authentication err"})
    }else{
        try{
            const data=jwt.verify(token,process.env.JWT_KEY);
            console.log(data)
            req.id=data.user.id;
            next()

        }catch(err){
            console.log(err)
        }
    }
}
module.exports=fetchUser