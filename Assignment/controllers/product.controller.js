const product=require("../models/product.model")

// add
const addProduct =async (req,res)=>{
    const productCreate= await product.create({
        ...req.body
    })

    res.json({
        message:"Product created",
        productCreate
    })
}

// delete
// update
// find all
const getAllProducts=async (req,res)=>{
    const all=await product.find();
    res.json({
        message:"All Product Fetched",
        all
    })
}
// find single
// find category

module.exports={addProduct,getAllProducts}