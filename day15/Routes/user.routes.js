import { Router } from "express";
import { login, register, validateToken,Logout, addToCart } from "../controllers/user.controller.js";

const router = Router();

router.post("/register",register);
router.post("/login",login);
router.get("/validate-token",validateToken);
router.get("/logout",Logout)
router.post("/add-to-cart", addToCart);
router.get("/cart/:userId", getCartProducts);


export default router;