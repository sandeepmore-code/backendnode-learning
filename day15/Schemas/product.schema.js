 import mongoose, {Schema} from "mongoose";

 const productSchema = new Schema({
  name : String,
  category : String,
  price : Number,
  quantity : Number,
  tags : [String],
  user : { type: mongoose.Schema.Types.ObjectId, ref : "User" },
  // payment : {type : mongoose.Schema.Types.ObjectId,ref : "payment"},
 });

 const ProductSchema = mongoose.model("Product",productSchema);

 export default ProductSchema;