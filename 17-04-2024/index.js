import express from "express";
import allRoutes from "./routes/index.js";
import morgan from "morgan";
import { validToken } from "./custom middleware/middleware.js";

const app = express();

app.use(morgan("combined"))

app.use(express.json());

app.use(validToken);

// app.use((req,res,next)=>{
//   const{isAssigmentCompleted}=req.body;
//   if(isAssigmentCompleted === "true"){
//     next();
//   }else{
//     res.send("Complete assigment");
//   }
// });

app.use((error,req,res,next)=>{
  if(error){
    res.send(error)
  }else{
    next();
  }
})

app.post("/",(req,res)=>{
  res.send("Hello");
});

app.get("/",(req,res)=>{
  res.send("Working..");
});

app.use('/api/v1', allRoutes)

app.listen(3000,()=>{
  console.log("port 3000 listning.");
});