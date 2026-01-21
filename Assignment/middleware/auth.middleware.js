const jwt=require("jsonwebtoken");


function authMiddleWare(req,res,next){
    const {token}=req.cookies;
    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
        token==decoded;
        next()
    }
    catch(err){
        return res.status(401).json({
            message:"Secret Key Not Matched"
        })
    }

    // console.log(token)
}

module.exports=authMiddleWare