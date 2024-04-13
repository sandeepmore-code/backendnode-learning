import express, { json } from "express"

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
  res.send("working...")
});

app.post("/register",(req,res)=>{
  try{
    // console.log(req.body, "request for body")
    const {name,email,password,confirmPassword}=req.body;
    // console.log(name,email,password,confirmPassword,"name");
    if(!name || !email || !password || !confirmPassword ){
      res.send("all feilds are required")
    }
    if(password !== confirmPassword){
      res.send("password not match")
    }
    res.send("registration successfull.");
  }catch(error){
    res.send(error);
  }
});

app.listen(3000,() => {
  console.log("Server is listeing on port 3000");
})