require("dotenv").config()
const express=require("express");
const app=express();
const connectToDB=require("./config/db")

const userRoutes=require("./routes/user.routes")
const productRoutes=require("./routes/product.routes")

const cookies=require("cookie-parser");

app.use(cookies());

connectToDB();
app.listen("5000",()=>{
    console.log("LIstening at 5000")
})

app.use("/user",userRoutes);
app.use("/product",productRoutes);
