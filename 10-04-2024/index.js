const express = require("express");

const app = express();

app.get('/',function(req,res){
  res.send("welcome")
});
app.get('/hii',function(req,res){
  res.send("Here we go!")
})
app.listen(3002,()=>{
  console.log("server lestning on port 3000")
});