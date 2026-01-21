const express=require("express");
const router=express.Router()
const {sendOtp,verifyOtp}=require("../controller/otp.controller")

router.post("/sendOtp",sendOtp);
router.post("/verifyOtp",verifyOtp);

module.exports=router