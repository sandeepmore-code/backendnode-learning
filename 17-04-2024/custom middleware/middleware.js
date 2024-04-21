export const validToken = (req,res,next)=>{
  console.log("Toeken Verified.");
  next();
};