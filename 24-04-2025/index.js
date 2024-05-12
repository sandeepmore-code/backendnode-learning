// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import AllRoutes from './routes/index.js'


// const app = express();
// app.use(express.json());
// dotenv.config();


// app.get("/",(req,res)=>{
//   res.send("working..");
// });

// app.use('/api/v1', AllRoutes)

// mongoose.connect(process.env.MONGODB_URL).then(()=>{
//   console.log("DB Connected")
// })

// app.listen(3001,()=>{
//   console.log("port listing at 3000")
// });

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AllRoutes from "./routes/index.js";
import cors from "cors";

var corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
const app = express();
app.use(express.json());
dotenv.config();
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Working..");
});

app.use("/api/v1", AllRoutes);

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("DB connected.");
});

app.listen(3001, () => {
  console.log("Listening on port 3001.");
});
