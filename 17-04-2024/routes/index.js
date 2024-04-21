import { Router } from "express";
import userRoutes from "./user.routes.js";

const routes = Router();

routes.use((req,res,next)=>{
  console.log("inside router level middleware.");
  next();
});

routes.use('/user',userRoutes);

export default routes;
