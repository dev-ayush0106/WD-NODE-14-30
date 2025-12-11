const mongoose=require("mongoose")

const noteSchema=new mongoose.Schema({
    noteId:{
        type:Number,
        unique:true
    },
    title:String,
    content:String
});

const noteModel=mongoose.model("notes",noteSchema)

module.exports=noteModel;