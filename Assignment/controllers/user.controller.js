const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const user=require("../models/user.model");
const cookies=require("cookie-parser");

// register
const registerUser=async(req,res)=>{
    const {name,email,password}=req.body
    const existingUser=await user.findOne({email});

    if(existingUser){
        res.json({
            message:"User Exist!!"
        })
    }

    const hashedPassword=await bcrypt.hash(password,10);

    const userDetail=await user.create({
        name,
        email,
        password:hashedPassword
    })

    res.json({
        message:"User Created",
        userDetail
    })

}
// login
const loginUser=async(req,res)=>{
    const {email,password}=req.body

    const exists=await user.findOne({email});
    if(!exists){
        res.json({
            message:"Invalid Credentials!!!"
        })
    }

    const isMatch=await bcrypt.compare(password,exists.password)
    if(!isMatch){
        res.json({
            message:"Invalid Password!!"
        })
    }

    const token=jwt.sign(
        {id:exists._id,email:exists.email},
        process.env.JWT_SECRET_KEY,
        {expiresIn:"1d"}
    );

    res.cookie("token",token);

    res.json({
        message:"User Logged In",
        token
    })
}

// getProfile
const userProfile=async (req,res)=>{
    const {token}=req.cookies;
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
    const{email}=decoded

    const userDetail = await user.find({email}).select("name email role");
    res.status(200).json({
        message:"User Profile",
        userDetail
    })
}
// updateProfile
const updateProfile=async (req,res)=>{
    const {token}=req.cookies;
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);

    const{email}=decoded;
    const updates={};

    if(req.body.name){updates.name=req.body.name};
    if(req.body.password){updates.password=await bcrypt.hash(req.body.password,10)}

    const userUpdate=await user.findOneAndUpdate({email},updates,{
        new:true
    }).select("-password")

    res.json({
        message:"User Updates",
        userUpdate
    })
}
// deleteProfile
const deleteProfile=async(req,res)=>{
    const {token}=req.cookies;
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);

    const{email}=decoded;

    await user.findOneAndDelete({email})

    res.json({
        message:"User Deleted"
    })
}

module.exports={registerUser,loginUser,userProfile,updateProfile,deleteProfile}