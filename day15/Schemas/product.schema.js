 import mongoose,{Schema} from "mongoose";

 const productSchema = new Schema({
  name : String,
  category : String,
  price : Number,
  quantity : Number,
  tags : [String]
 });

 const ProductSchema = mongoose.model("product",productSchema);

 export default ProductSchema;