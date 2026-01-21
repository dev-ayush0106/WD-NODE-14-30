const nodemailer=require("nodemailer");

const sendEmail= async(email,otp)=>{
    const transporter=await nodemailer.createTransport({
        port:587,
        secure:false,
        service:"gmail",
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASS
        }
    })

    await transporter.sendMail({
        from:process.env.EMAIL,
        to:email,
        subject:"Login Authentication",
        text:`Your Login OTP is ${otp}`
    })
}

module.exports=sendEmail;