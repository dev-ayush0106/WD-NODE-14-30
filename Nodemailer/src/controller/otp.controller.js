const generateOtp=require("../utils/generateOtp")
const sendEmail=require("../utils/sendEmail")

const otpStore={};

const sendOtp=async (req,res)=>{
    const{email}=req.body;

    const otp=generateOtp();
    const expiresAt=Date.now()+2*60*1000

    otpStore[email]={otp,expiresAt}

    try{
        await sendEmail(email,otp);
        res.send("Otp send successfully")
    }
    catch(err){
        res.send("Otp Not send")
        console.log(err)
    }
}

const verifyOtp=(req,res)=>{
    const {email,otp}=req.body

    const storedOtp=otpStore[email];

    if(Date.now()>storedOtp.expiresAt){
        delete otpStore[email]
        res.send("OTP expires");
    }

    if(storedOtp.otp==otp){
        delete otpStore[email]
        res.send("Otp succesfully matched");
    }

    res.send("Invalid Otp")
}

module.exports={verifyOtp,sendOtp}