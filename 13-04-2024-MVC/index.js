import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
const app = express();
dotenv.config();

app.get("/",(req,res)=>{
  res.send("working.");
});

mongoose.connect(process.env.MONGODB_URL).then(()=>{
  console.log("DataBase Connected")
});

app.listen(8000,()=>{
  console.log("listning on port 3000.");
});