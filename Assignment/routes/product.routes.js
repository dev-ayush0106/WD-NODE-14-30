const {addProduct,getAllProducts}=require("../controllers/product.controller")
const express=require("express");
const router=express.Router();
const auth=require("../middleware/auth.middleware")

router.use(express.json());

router.post("/add",auth,addProduct)
router.get("/",getAllProducts)

module.exports=router;