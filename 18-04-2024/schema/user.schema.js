import mongoose,{Schema} from "mongoose";

const userSchema = new Schema ({
  name : String ,
  email : String,
  password : String,
  age : Number,
})

const UserSchema = mongoose.model("user", userSchema);

export default UserSchema;