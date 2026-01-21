const express = require("express");
const router = express.Router();
const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const cookies = require("cookie-parser")
const bcrypt = require("bcrypt")

router.use(express.json())
router.use(cookies())
router.post("/signup", async (req, res) => {
    const { username, password } = req.body;

    const user = await userModel.create({
        username,
        password: await bcrypt.hash(password, 10)
    })
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY)
    console.log(token);

    res.cookie("token", token);

    res.json({
        message: "Data",
        user: username,
        pass: password
    });

})

router.post("/login", async (req, res) => {
    const { username, password } = req.body

    const user = await userModel.findOne({
        username: username
    })

    if (!user) {
        res.json({
            message: "Invalid user name pls recheck."
        })
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
        res.json({
            message: "Incorrect password"
        })
    }
    else {
        res.json({
            message: "User Found",
            user
        })
    }
})

router.get("/user", async (req, res) => {
    const { token } = req.cookies;
    // res.send(token)

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // res.send(decoded);

    const user = await userModel.find({
        _id: decoded.id
    }).select("username -_id")

    res.status(200).json({
        message: "Data Fetched",
        user
    })


})

router.post("/forgot", async(req, res) => {
    const { username, newPass, cnNewPass } = req.body

    const user=await userModel.findOne({
        username:username
    })

    if(!user){
        res.status(401).json({
            message:"Invalid UserName"
        })
    }

    if(newPass!==cnNewPass){
        res.status(400).json({
            message:"Both Password are different.Please Check"
        })
    }

    const update=await userModel.findOneAndUpdate(
        {username:user.username},
        {password:await bcrypt.hash(newPass,10)}
    )

    res.status(200).json({
        message:"Sucessfully Changed Password"
    })
})

module.exports = router