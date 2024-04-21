import express from "express";
import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";
import UserSchema from "./schema/user.schema.js";

const app = express();
dotenv.config();
app.use(express.json());

app.get("/",(req,res)=>{
  res.send("its working...");
});


app.post("/register",async (req,res)=>{
  try{
    const { name, email,password,age}=req.body;
    if(!name || !email || !password || !age) return res.status(404).json({sucess : false , message : "all filds are reequired"});
    const user = new UserSchema  ({
      name : name,
      email : email,
      password : password,
      age ,
    });
    console.log("user",user);
    await user.save()
    res.status(201).json({sucess : true , message : "registration succesfull"});
  }catch(error){
    return res.status(500).json({sucess : false , error : error});
  }
 });


 
 
 mongoose.connect(process.env.MONGODB_URL).then(()=>{
  console.log("DB Connected");
});

// app.post("/get-user",(req,res)=>{
//   try{
//     const users = UserSchema.find({$eq:21})
//     if
//   }catch(error){
//     return res.status(500).json({sucess : false, error});
//   }
// })


app.listen(3000,()=>{
  console.log("listning on port 3000");
});
