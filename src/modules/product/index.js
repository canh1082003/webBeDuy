import express from "express";
import productController from "./productController.js";
import uploadCloud from "../../utils/upload.js";
import { isAdmin, isLogin } from "../../middleware/auth.middleware.js";
const ProductRouter = express.Router();
ProductRouter.get("/all", productController.getAllProduct);
ProductRouter.get("/category", productController.getCategory);

ProductRouter.get("/:id", productController.getProductById);

ProductRouter.post(
  "/createProduct",
  isLogin,
  isAdmin,
  uploadCloud.single("imgUrl"),
  productController.createProduct
);
ProductRouter.put(
  "/updateProduct/:id",
  isLogin,
  isAdmin,
  productController.updateProduct
);
ProductRouter.delete(
  "/deleteProduct/:id",
  isLogin,
  isAdmin,
  productController.deleteProduct
);
export default ProductRouter;
