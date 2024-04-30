import productService from "./productService.js";

class ProductController {
  async getAllProduct(req, res) {
    const { category } = req.query;
    try {
      const products = await productService.findAllProducts(category);
      return res.status(200).json({
        products,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Get all product error",
      });
    }
  }
  async getProductById(req, res) {
    try {
      const id = req.params.id;
      const product = await productService.findProductById(Number(id));
      if (!product) {
        throw new Error("Not Found");
      }
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({
        message: "Get product error",
      });
    }
  }
  async createProduct(req, res) {
    try {
      const newProduct = await productService.createProduct(req);
      return res.status(200).json(newProduct);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "create product error",
      });
    }
  }
  async getCategory(req, res) {
    try {
      const category = await productService.findCategory();

      return res.status(200).json(category);
    } catch (error) {
      return res.status(500).json({
        message: "get category error",
      });
    }
  }

  async updateProduct(req, res) {
    const id = req.params.id;
    const updatedData = req.body;
    try {
      await productService.updateProduct(Number(id), updatedData);
      return res.status(200).json("update Success");
    } catch (error) {
      return res.status(500).json({
        message: "updateProduct error",
      });
    }
  }
  async deleteProduct(req, res) {
    const { id } = req.params;
    try {
      await productService.deleteProduct(Number(id));
      return res.status(200).json("Delete Success");
    } catch (error) {
      return res.status(500).json({
        message: "deleteProduct error",
      });
    }
  }
}
export default new ProductController();
