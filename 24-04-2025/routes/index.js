import { Router } from "express";
import AuthRoutes from "./Auth.Routes.js";


const router = Router();

router.use('/auth',AuthRoutes);


export default router;