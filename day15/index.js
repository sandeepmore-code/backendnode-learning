import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import ProductSchema from "./Schemas/product.schema.js";

const app = express();
dotenv.config()
app.use(express.json());

app.get('/',(req,res)=>{
  res.send("working....")
});

app.post("/add-product",async (req,res)=>{
  try{
    const {name, category ,price,quantity} = req.body;
    if(!name || !category || !price || !quantity){
      return res.json({success : false , Message : "All fields are required"})
    }
    const newProduct = new ProductSchema({
      name : name,
      category : category,
      price : price,
      quantity : quantity
    });
    await newProduct.save();
    return res.json({success : true, message : "product succesfully stored"})
  }catch(error){
    return res.json({success : false,error})
  }
})


mongoose.connect(process.env.MONGODB_URL).then(()=>{
  console.log("DB connected")
});

app.listen(3001,()=>{
  console.log("server listning on 3001")
})
