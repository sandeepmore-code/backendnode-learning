import { Router } from "express";
import UseRoutes from "./user.routes.js";
import UseProducts from "./Products.routes.js"


const router =Router();

router.use('/user',UseRoutes);
router.use('/Products',UseProducts);

export default router;