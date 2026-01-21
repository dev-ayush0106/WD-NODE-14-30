const express=require("express");
const app=express()
const cors=require("cors");
const otpRoutes=require("./routes/otp.route")

app.use(express.json());
app.use(cors())
app.use("/api",otpRoutes);

module.exports=app;