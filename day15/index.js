import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import ProductSchema from "./Schemas/product.schema.js";
import UserSchema from "./Schemas/user.schema.js";
import bcrypt from "bcrypt"
import cors from "cors";
import jwt from "jsonwebtoken"
import cookieParser from 'cookie-parser';



const app = express();
var corsOptions = {
  origin : "http://localhost:3000",
  credentials : true
};
app.use(cors(corsOptions)); 
dotenv.config()
app.use(express.json());

app.use(cookieParser());




app.get('/',(req,res)=>{
  res.send("working....")
});

app.post("/add-product",async (req,res)=>{
  try{
    const {name, category ,price,quantity,tags} = req.body.productData;
    const {userid}= req.body;
    if(!name || !category || !price || !quantity || !tags || !userid){
      return res.json({success : false , Message : "All fields are required"})
    }
    const newProduct = new ProductSchema({
      name : name,
      category : category,
      price : price,
      quantity : quantity,
      tags: tags,
      user : userid,
    });
    await newProduct.save();
    return res.json({success : true, message : "product succesfully stored"})
    
  }catch(error){
    return res.json({success : false,error})
  }
})

app.post("/get-products-by-category-price", async (req,res)=>{

      try{
        const { category, price} = req.body;
    const aggretation = [
          {
          
            $match : {category : category, price:{$gt : price}}
          },
          {
            $group: {
              _id : "$product",
              totalQuantity: {$sum : "$quantity"},
              totalPrice: {$sum:{$multiply :["$quantity","$price"]}}
            },
          },
        ];
        const filteredProducts = await ProductSchema.aggregate(aggretation);
        console.log(filteredProducts,"filteredProducts")
        res.send(true);

      }catch(error){
        return res.json({success : false , error})
      }
})

app.post("/unwind-project",async(req,res)=>{
  try{
const aggreation = [
  {$unwind :"$tags"},
  {$project: {name: 1 , price: 1}}
]
const filteredproducts = await ProductSchema.aggregate(aggreation);
console.log(filteredproducts)
res.send(true)
  }catch(error){
    return res.json({success : false , error})
  }
})

app.get("/get-products-by-user",async (req,res)=>{
try{
const {userId}= req.body;
const products = await ProductSchema.find({user : userId}).populate("user");
res.send(products); 
}catch(error){
    return res.json({success : false , error})
  }
})
app.post("/register",async(req,res) => {
  try{
    const {name,email,password,confirmpassword} = req.body.userData;
    if(!name || !email || !password || !confirmpassword){
      return res.json({success : false, message : "All feilds are required"})
    }
    if(password!== confirmpassword){
      return res.json({success : false, message : "Password not matched"})
    }
    const IsEmailExists = await UserSchema.findOne({email : email})
    // console.log(IsEmailExists,"IsEmailExist")
    if(IsEmailExists){
      return res.json({success : false,message : "Email Already Exist"})
    }
    const HashedPassword = await bcrypt.hash(password,10)
    const newUser = await new UserSchema({
      name : name,
      email : email,
      password : HashedPassword
    })
    await newUser.save()
   return res.json({success : true, message : "registration completed"});
  }catch(error){
    console.log(error,"error")
      return res.json({error,success : false})
  }
});

app.get("/get-products",async (req,res)=>{
try{
const products = await ProductSchema.find({});
return res.json({success : true, products : products})
}catch(error){
  console.log(error,"error")
      return res.json({error,success : false})
}
})
app.post('/login', async(req,res) => {
  try{
    const {email,password} = req.body.userData;
    if( !email || !password){
      return res.json({success : false, message : "All feilds are required"})
    }
    const User = await UserSchema.findOne({email : email})
    if(!User){
      return res.json({success : false,message : "User Not Exist ,please check your email"})
    }
    // console.log(User , "User")

    const isPasswordCorrect = await bcrypt.compare(password, User.password);
    if(!isPasswordCorrect){
      return res.json({success : false,message : "Password is incorrect"})
    }

    const token = jwt.sign({id :User._id}, process.env.JWT_SECRET)
    // console.log(token,"token");
    res.cookie("token", token)
    return res.json({success : true,message : " Login successful ", userData : User})

  }catch(error){
    console.log(error,"error")
      return res.json({error,success : false})
  }
});
app.get('/validate-token', async (req,res)=>{
  try{
  const token = req?.cookies?.token
  console.log(token,"token");
  
  if(!token){
    return res.json({success : false,message : "token not found"})
  }
  const decodedData = await jwt.verify(token,process.env.JWT_SECRET)
  // console.log(decodedData);
  if(!decodedData.id){
    return res.json({success : false,message : "token is expired"})
  }
   const user = await UserSchema.findById(decodedData.id)
  console.log(user)
  if(!user){
    return res.json({success : false,message : "token invalid"})
  }
  return res.json({user,success : true})
  }catch(error){
  console.log(error,"error")
  return res.json({error,success : false})
  }
  });

mongoose.connect(process.env.MONGODB_URL).then(()=>{
  console.log("DB connected")
});

app.listen(3001,()=>{
  console.log("server listning on 3001")
});

