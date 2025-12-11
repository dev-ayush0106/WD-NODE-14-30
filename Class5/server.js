const express=require("express");
const connectToDb=require("./src/db/db")
const noteModel=require("./src/model/notes.model")
const app=express();

app.use(express.json());
connectToDb()

app.listen(5000,()=>{
    console.log("Listening at 5000");
})


app.get("/notes",async(req,res)=>{
    let notes=await noteModel.find()
    res.json(notes);
})

app.post("/posts",async (req,res)=>{
    const count=await noteModel.countDocuments()
    const{title,content}=req.body;

    noteModel.create({
        noteId:count+1,
        title,
        content
    });
    res.send("Note Created");
})

app.patch("/update/:noteId",async(req,res)=>{
    const {content}=req.body
    const {noteId}=req.params

    await noteModel.findOneAndUpdate(
        {noteId:Number(noteId)},
        {content}
    )
    res.send("Content Updated")
})

app.delete("/delete/:noteId",async(req,res)=>{
    const {noteId}=req.params
    
    await noteModel.findOneAndDelete({noteId:Number(noteId)})
    res.send("Note Deleted")

    const allNotes=await noteModel.find().sort({noteId:1}) // all the data from the database
    for(let i=0;i<allNotes.length;i++){ // loop
        allNotes[i].noteId=i+1; // i have re-sequenced the noteId
        await allNotes[i].save()
    }
})