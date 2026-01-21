const express=require("express");
const router=express.Router();
const multer=require("multer");
const songsModel=require("../model/songs.model")
const uploadFile=require("../services/songs.services")
const cors=require("cors")

const storage=multer({
    storage:multer.memoryStorage(),
    limits:{
        file:20,
        fileSize:200*1024*1024
    }
});

router.use(express.json());
router.use(cors());

/*
    songTitle
    artistTitle
    Song
    mood
*/

router.post("/songs",storage.array("audioFile"),async(req,res)=>{
    // res.send(req.body);

    console.log(req.body.songData)
    // console.log(req.body)
    console.log(req.files)

    const songDatas=JSON.parse(req.body.songData);
    const files=req.files;

    if(songDatas.length !== files.length){
        return res.status(400).json({
            message:"Song data count & File count is not equal!"
        })
    }

    let savedSongs=[];
    for(let i=0;i<files.length;i++){
    const fileData= await uploadFile(req.files[i])

    const songs=await songsModel.create({
        title:songDatas[i].title,
        artist:songDatas[i].artist,
        audioFile:fileData.url,
        mood:songDatas[i].mood
    })

    savedSongs.push(songs)
    }

    // const allSong=songsModel.find()

    res.status(201).json({
        message:"Song Created",
        songs:savedSongs
    })

    // res.status(201).json({
    //     message:"Song Created"
    // })

})

router.get("/songs",async(req,res)=>{
    let data=await songsModel.find();
    res.status(200).json({
        data
    })
})

module.exports=router;