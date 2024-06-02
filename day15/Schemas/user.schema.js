import { Schema ,model} from "mongoose";

const userSchema = new Schema({
  name : String,
  email : String,
  password : String,
  role : String,
  cart : [String],
  Wishlist : [String]
})
const UserSchema = model("User",userSchema);

export default UserSchema;