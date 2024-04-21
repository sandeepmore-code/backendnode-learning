import { Router } from "express";

const router = Router();

router.get("/hi",(req,res)=>{
  res.send("Hii from user")
});

export default router;