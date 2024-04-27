import UserSchema from "../models/users.schema.js";
import bcrypt from "bcrypt";



export const Register = async(req,res) => {
  try{
    const {name, email, password, confirmpassword} = req.body;

    if(!name || !email || !password){
     return res.json({success : false, message : "please enter all fields"})
    };

    if(password !== confirmpassword){
      return res.json({success : false, message : "Password doesnt match,please try again"});
    };

    const isEmailExists = await UserSchema.findOne({ email : email});
    if(isEmailExists){
      return res.json({succes : false, message : "email already exisit "})
    }

    const HashedPassword = await bcrypt.hash(password,10);
    const newUser = new UserSchema({
      name : name,
      email : email,
      password : HashedPassword,
    })
    await newUser.save();
    return res.json({success : true, message : "Registration completed."});
  }catch(error){
    return res.json({error, success : false});
  }
}

export const Login = async(req,res) => {
  try{
    const {email,password} = req.body;
    if(!email || !password){
      return res.json({succes : false,message : "All Fields are Required"});
    };

    const user = await UserSchema.findOne({email: email});
    if(!user){
      return res.json({sucess : false , message : "User not exist, please check your email."})
    }

    bcrypt.compare(myPlaintextPassword, hash, function(err, result){
     try{

     }catch(error){

     }
     });
    res.send("login")
  }catch(error){
    return res.json({error,succes : false});
  }
  
};