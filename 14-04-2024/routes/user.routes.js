import { Router } from "express";
import { Login, Logout, register } from "../controllers/user.controller.js";

const router = Router();

router.post('/login', Login);
router.post('/register', register);
router.post('/logout', Logout);

export default router;