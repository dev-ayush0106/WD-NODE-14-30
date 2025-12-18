const express=require("express");
const router=express.Router();
const multer=require("multer");
const songsModel=require("../model/songs.model")
const uploadFile=require("../services/songs.services")
const cors=require("cors")

const storage=multer({storage:multer.memoryStorage()});

router.use(express.json());
router.use(cors());

/*
    songTitle
    artistTitle
    Song
    mood
*/

router.post("/songs",storage.single("audioFile"),async(req,res)=>{
    // res.send(req.body);
    console.log(req.body)
    console.log(req.file)

    const fileData= await uploadFile(req.file)
    console.log(fileData);

    const songs=await songsModel.create({
        title:req.body.title,
        artist:req.body.artist,
        audioFile:fileData.url,
        mood:req.body.mood
    })

    // const allSong=songsModel.find()

    // res.status(201).json({
    //     message:"Song Created",
    //     allSongs:allSong
    // })

    res.status(201).json({
        message:"Song Created"
    })

})

router.get("/songs",async(req,res)=>{
    let data=await songsModel.find();
    res.status(200).json({
        data
    })
})

module.exports=router;