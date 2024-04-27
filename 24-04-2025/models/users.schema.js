// import { Schema, model } from "mongoose";

// const userSchema = new Schema({
//   name : String,
//   email : String,
//   password : String,
// });

// const UserSchema = model("user",userSchema);

// export default UserSchema;

import { Schema,model } from "mongoose";

const userSchema = new Schema({
  name : String,
  email : String,
  password : String
});

const UserSchema = model('user',userSchema);
export default UserSchema;


