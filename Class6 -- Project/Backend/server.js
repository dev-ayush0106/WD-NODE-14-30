require("dotenv").config();
const express=require("express");
const app=require("./src/app")
const connectToDb=require("./src/db/db")

connectToDb()
app.listen(3000,()=>{
    console.log("Listening at 3000")
})