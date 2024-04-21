import { Router } from "express";
import Userroutes from "./user.routes.js"

const router = Router();


router.use('/user', Userroutes);

export default router;