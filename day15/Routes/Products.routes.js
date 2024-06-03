import { Router } from "express";
import { addProduct, getAllProducts, getProductsByCategoryPrice, getProductsBySeller } from "../controllers/product.Controllers.js";

const router = Router();

router.post("/add-product",addProduct);
router.post("/get-products-by-category-price", getProductsByCategoryPrice);
router.post("/get-products-by-seller",getProductsBySeller);
router.get("/get-all-products",getAllProducts);

export default router;

