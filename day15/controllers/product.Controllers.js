import ProductSchema from "../Schemas/product.schema.js";


export const addProduct= async (req,res)=>{
  try{
    const {name, category ,price,quantity,tags} = req.body.productData;
    const {userid}= req.body;
    if(!name || !category || !price || !quantity || !tags || !userid ){
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
}
export const getProductsByCategoryPrice= async (req,res)=>{

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
};
export const getProductsBySeller= async (req,res)=>{
  try{
  const {userId}= req.body;
  console.log(userId,"User Id is here")
  const products = await ProductSchema.find({user : userId}).populate("user");
  res.json({success : true ,products }); 
  }catch(error){
      return res.json({success : false , error})
    }
};


export const getAllProducts= async (req,res)=>{
  try{
  const products = await ProductSchema.find({});
  return res.json({success : true, products : products})
  }catch(error){
    console.log(error,"error")
        return res.json({error,success : false})
  }
};