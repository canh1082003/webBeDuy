import express from "express";
import ProductRouter from "../modules/product/index.js";
import UserRouter from "../modules/user/index.js";
const router = express.Router();
router.use("/product", ProductRouter);
router.use("/user", UserRouter);
export default router;
