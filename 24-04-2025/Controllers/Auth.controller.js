import UserSchema from "../models/users.schema.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"




export const Register = async(req,res) => {
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
};
   

export const Login = async(req,res) => {
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
};

export const validateToken=  async (req,res)=>{
try{
const token = req.cookies.token
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
};

