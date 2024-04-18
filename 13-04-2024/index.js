import express, { json } from "express";

const app = express();

const students =[{id : 1,name : "sandeep", email : "sandeep1@gmail.com"},
{id : 2,name : "Rohit", email : "Rohit1@gmail.com"},
{id : 3,name : "Yogesh", email : "Yogesh1@gmail.com"}
]

app.get("/",(req,res)=>{
  res.send("Working!...");
});

app.delete("/delete-user/:id",(req,res)=>{
  try{
    const userId = parseInt(req.params.id);
    if(!userId) return res.status(404).json({success : false, message : "UserID required."});

    const user = students.findIndex((user) => user.id === userId);

    if(user == -1 ) return res.status(404).json({success : false , message : "user not found"});

     students.splice(user,1);
    res.status(200).json({success : true, message : "user delete successfull", students : students})
    console.log(user,"user");
    res.send(true);
  }catch(error){
    return res.status(500).json({success : false , error : error});
  }
});

app.listen(8000,()=>(
  console.log("listining on port 3002.")
));