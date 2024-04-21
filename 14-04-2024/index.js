import express from "express";
import Allroutes from './routes/index.js';

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
res.send("working...");
});

app.use('/api/v1', Allroutes);

app.listen(3000,()=>{
  console.log("listning on port 3000");
});