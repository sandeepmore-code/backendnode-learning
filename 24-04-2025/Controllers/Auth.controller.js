import UserSchema from "../models/users.schema.js";
import bcrypt from "bcrypt";



export const Register = async(req,res) => {
  try{
    const {name,email,password,confirmpassword} = req.body.userData;
    if(!name || !email || !password || !confirmpassword ){
      return res.json({success : false, message : "All feilds are required"})
    }
    if(password !== confirmpassword){
      return res.json({success : false,message : "password not matched!, please Re-enter"});
    }
    const isEmailexsists= await UserSchema.findOne({email : email});
    
    if(isEmailexsists){
      return res.json({success : false, message: "Email already exist"})
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser= new UserSchema({
      name : name,
      email : email,
      password : hashedPassword,
    });
    await newUser.save(); 
    return res.json({success : true, message : "registration completed."})
  }catch(error){
    console.log(error)
    return res.json({error,success: false,})
 
  }
  
};
   

export const Login = async(req,res) => {
  try{
    const {email,password} = req.body;
    if(!email || !password ){
      return res.json({success : false, message : "all Feilds are required"});
    }
    const user = await UserSchema.findOne({email : email})
    if(!user){
      return res.json({
        success : false,
        message : "user not exist ,please check you email"
      });
    }
    console.log(user,"user");
    const isPasswordCorrect = await bcrypt.compare(password,user.password);

    if(!isPasswordCorrect){
      return res.json({success:false,message : "please enter correct password"});
    }
    return res.json({success : true,message: "Login Successful"})
  }catch(error){
    return res.json({Success : false, error})
  }

};

