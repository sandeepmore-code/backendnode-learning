import { Router } from "express";
import { Login, Register } from "../Controllers/Auth.controller.js";

const router =Router();

router.post('/register',Register);
router.post('/login',Login);
// router.get ('/auth',Auth)

export default router;