import { Router } from "express";
import { Login, Register, validateToken } from "../Controllers/Auth.controller.js";



const router =Router();

router.post('/register',Register);
router.post('/login',Login);
router.get('/validate-token',validateToken);

export default router;