const mongoose=require("mongoose");

function connectToDb(){
    mongoose.connect("mongodb+srv://backend:backendConnect@cluster0.mlcqef4.mongodb.net/NoteApp")
    .then(()=>{
        console.log("Connected to DB");
    })
}

module.exports=connectToDb;