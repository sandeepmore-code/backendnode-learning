import express from "express";
import mongoose from "mongoose";
import dotenv, { config } from "dotenv";
import UserSchema from "./module/user-schema.js";


const app = express();
app.use(express.json());
dotenv.config();

app.get("/",(req,res)=>{
  res.send("Working....")
});

mongoose.connect(process.env.MONGODB_URL).then(()=>{
  console.log("DB concted")
});

// app.get("/filter-users",async(req,res)=>{
// try{
  // const user = await UserSchema.find();
  // const user = await UserSchema.find({age : 20})
  // const user = await UserSchema.find({age:{$eq : 21}})
  // const user = await UserSchema.find({age:{$ne : 21}});
  // const user = await UserSchema.find({age:{$gt : 20}});
  // const user = await UserSchema.find({age:{$lt : 35}}):
  // const user = await UserSchema.find({age:{$in : [21,35]}});
  // const user = await UserSchema.find({contact : {$exists : true }});

  // logical operator query:

// const user = await UserSchema.find({$and : [{age :21, name : "sandeep"}]});
// const user = await UserSchema.find({$or : [{age : 21}, {name : "rohit"}]});
// const user = await UserSchema.find({$and : [{age : 21}, {name : "rohit"}]});
// const user = await UserSchema.find({age:{$not:}}})
//   return res.status(202).json({sucess : true,user});
// }catch(error){
// return res.status(500).json({error,sucess : false,message : "please recheck"})
// }
// });

// // app.post("/register",(req,res)=>{
// // console.log("Postman at your service.");
// // try{

// // }catch(error){
// //   return res.status(404).json({sucess : false, error});
// // }

// });

// app.listen(3000,()=>{
// console.log("Server listning on port 3000");
// });
