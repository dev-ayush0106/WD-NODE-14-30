const mongoose=require("mongoose");

const productSchema=new mongoose.Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    category:{type:String,required:true},
    stock:{type:Number,required:true},
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
},
{
    timestamps:true
}
);

const productModel=mongoose.model("products",productSchema);
module.exports=productModel;