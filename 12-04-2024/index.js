import express from "express";

const app = express();

app.get("/",(req,res)=>{
console.log("Workong...")
});

app.post("/register",(req,res)=>{
  res.send("inside post APi")

})
app.listen(3000,()=>{
  console.log("server is listing at port 3000")
});