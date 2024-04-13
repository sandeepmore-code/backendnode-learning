import express from "express";

const app =express();

app.use(express.json());

const users = [{id : 1,name : "sandeep", email : "sandeep1@gmail.com" },
               {id : 2,name : "Rohit", email : "R2@gmail.com"},
               {id : 3,name : "Yogesh", email : "Y3@gmail.com"}
              ]

app.get("/",(req,res)=>{
  res.send("working...");
});

app.put("/update-data/:id",(req,res)=>{

  try{
    const {name,email} = req.body;
  if(!name || !email)return res.status(404).json({messgae :"all feilds are required.",sucess : false})
  // res.send(req.params.id)
  const userId = parseInt (req.params.id);
  if(!userId) return res.status(404).json ({messgae : "userdata required.", success : false });
  // console.log(userId);
  const userData = users.find((user) => user.id === userId);

  if(!userData)returnres.json({message : "userdata required ." ,success : false});

  userData.email = email;
  userData.name = name;
  
  res.status(200).json({message : "userdata updates successfully", success : true, updateduserdata : userData});
  }catch(error){
    return res.status(500).json({success : false, error : error});
  }
  // console.log(userData);
  // res.send(true);
});

app.listen(3000,()=>{
  console.log("server is listning on port 3000.")
})