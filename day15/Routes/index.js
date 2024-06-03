// import { Router } from "express";
// import UseRoutes from "./user.routes.js";
// import UseProducts from "./Products.routes.js"


// const router =Router();

// router.use('/user',UseRoutes);
// router.use('/product',UseProducts);

// export default router;

import { Router } from "express";

import UserRoutes from "../Routes/user.routes.js"
import ProductRoutes from "../Routes/Products.routes.js"

const router = Router();

router.use("/user", UserRoutes);
router.use("/product", ProductRoutes);

export default router;