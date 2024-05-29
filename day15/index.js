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
    const {name, category ,price,quantity,tags} = req.body;
    if(!name || !category || !price || !quantity || !tags){
      return res.json({success : false , Message : "All fields are required"})
    }
    const newProduct = new ProductSchema({
      name : name,
      category : category,
      price : price,
      quantity : quantity,
      tags: tags,
    });
    await newProduct.save();
    return res.json({success : true, message : "product succesfully stored"})
    
  }catch(error){
    return res.json({success : false,error})
  }
})

app.post("/get-product",async (req,res)=>{

      try{
        const { category, price} = req.body;
    const aggretation = [
          {
          
            $match : {category : category, price:{$gt : price}}
          },
          {
            $group: {
              _id : "$product",
              totalQuantity: {$sum : "$quantity"},
              totalPrice: {$sum:{$multiply :["$quantity","$price"]}}
            },
          },
        ];
        const filteredProducts = await ProductSchema.aggregate(aggretation);
        console.log(filteredProducts,"filteredProducts")
        res.send(true);

      }catch(error){
        return res.json({success : false , error})
      }
})

app.post("/unwind-project",async(req,res)=>{
  try{
const aggreation = [
  {$unwind :"$tags"},
  {$project: {name: 1 , price: 1}}
]
const filteredproducts = await ProductSchema.aggregate(aggreation);
console.log(filteredproducts)
res.send(true)
  }catch(error){
    return res.json({success : false , error})
  }
})

mongoose.connect(process.env.MONGODB_URL).then(()=>{
  console.log("DB connected")
});

app.listen(3001,()=>{
  console.log("server listning on 3001")
})
