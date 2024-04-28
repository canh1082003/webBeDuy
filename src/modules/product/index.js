import express from "express";
import productController from "./productController.js";
import uploadCloud from "../../utils/upload.js";
const ProductRouter = express.Router();
ProductRouter.get("/all", productController.getAllProduct);
ProductRouter.get("/category", productController.getCategory);
ProductRouter.get(
  "/category/:categoryId",
  productController.getProductCategoryId
);
ProductRouter.get("/:id", productController.getProductById);

ProductRouter.post(
  "/createProduct",
  uploadCloud.single("imgUrl"),
  productController.createProduct
);
ProductRouter.put("/updateProduct/:id", productController.updateProduct);
ProductRouter.delete("/deleteProduct/:id", productController.deleteProduct);
export default ProductRouter;
