import UserSchema from "../models/users.schema.js";
import bcrypt from "bcrypt"





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
    const {email,password} = req.body;
    if( !email || !password){
      return res.json({success : false, message : "All feilds are required"})
    }
    const User = await UserSchema.findOne({email : email})
    if(!User){
      return res.json({success : false,message : "User Not Exist ,please check your email"})
    }
    console.log(User , "User")

    const isPasswordCorrect = await bcrypt.compare(password, User.password);
    if(!isPasswordCorrect){
      return res.json({success : false,message : "Password is incorrect"})
    }
    return res.json({success : true,message : " Login successful "})
  }catch(error){
    console.log(error,"error")
      return res.json({error,success : false})
  }
};

