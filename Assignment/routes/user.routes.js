const{registerUser,loginUser,userProfile,updateProfile,deleteProfile}=require("../controllers/user.controller");
const express=require("express");
const router=express.Router();
const auth=require("../middleware/auth.middleware")

router.use(express.json());

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/",auth,userProfile);
router.put("/update",auth,updateProfile);
router.delete("/delete",auth,deleteProfile);


module.exports=router;
